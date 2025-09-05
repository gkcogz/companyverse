// scripts/seed.js
const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  throw new Error("Supabase URL or Service Key is missing from .env.local");
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// --- VERİ İŞLEME FONKSİYONLARI ---

async function getAviationRecords() {
  const csvFilePath = path.resolve(__dirname, '../data/airlines.csv');
  const records = [];
  const parser = fs.createReadStream(csvFilePath).pipe(parse({ delimiter: ',', from_line: 1 }));
  const bannedKeywords = ['air force', 'army', 'navy', 'military', 'government', 'authority', 'cargo', 'charter', 'express', 'logistics'];
  
  console.log("Reading and filtering aviation data...");
  for await (const record of parser) {
    const [id, name, alias, iata, icao, callsign, country, active] = record;
    const lowerCaseName = name.toLowerCase();
    const isBanned = bannedKeywords.some(keyword => lowerCaseName.includes(keyword));

    if (active === 'Y' && iata && iata !== '\\N' && iata.length === 2 && country && country !== '\\N' && !isBanned) {
      records.push({
        name: name.trim(),
        slug: name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''),
        country: country.trim(),
        category: 'Aviation',
        // DEĞİŞİKLİK: IATA kodu artık metadata'nın içinde
        metadata: {
          iata_code: iata.trim(),
          icao_code: icao.trim() !== '\\N' ? icao.trim() : null
        }
      });
    }
  }
  return records;
}

async function getEnergyRecords() {
  console.log("Reading sustainable energy data from JSON file...");
  const jsonFilePath = path.resolve(__dirname, '../data/energy-companies.json');
  const companiesData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

  const records = companiesData.map(company => ({
    name: company.name.trim(),
    slug: company.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''),
    country: company.country.trim(),
    description: company.description.trim(),
    category: company.category.trim(),
    // DEĞİŞİKLİK: Enerji şirketleri için de gelecekte metadata eklenebilir
    metadata: company.metadata || {} 
  }));
  
  return records;
}


// --- ANA "SEEDING" FONKSİYONU ---

async function seedDatabase() {
  const target = process.argv[2];
  if (!target) {
    console.error("Please specify a target to seed: `node scripts/seed.js aviation` or `node scripts/seed.js energy`");
    return;
  }

  let recordsToInsert = [];
  if (target === 'aviation') {
    recordsToInsert = await getAviationRecords();
  } else if (target === 'energy') {
    recordsToInsert = await getEnergyRecords();
  } else {
    console.error(`Unknown target: ${target}`);
    return;
  }

  if (recordsToInsert.length === 0) {
    console.log("No new records found to insert.");
    return;
  }
  
  console.log(`Preparing to seed ${recordsToInsert.length} companies for category: ${target}`);

  // Önce o kategoriye ait mevcut veriyi temizleyelim
  console.log(`Clearing existing '${target}' companies from the database...`);
  const { error: deleteError } = await supabase
    .from('companies')
    .delete()
    .eq('category', target === 'aviation' ? 'Aviation' : 'Sustainable Energy'); // Kategoriye göre sil

  if (deleteError) {
    console.error(`Error clearing existing data for ${target}:`, deleteError);
    return;
  }

  // Verileri toplu halde ekle
  const { data, error: insertError } = await supabase.from('companies').insert(recordsToInsert).select();

  if (insertError) {
    console.error('Error seeding database:', insertError);
  } else {
    console.log(`Successfully seeded the database with ${data.length} ${target} companies!`);
  }
}

seedDatabase();