// scripts/seed.js
const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');
const { createClient } = require('@supabase/supabase-js');

// Read environment variables from the .env.local file at the project root
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  throw new Error("Supabase URL or Service Key is missing from .env.local. Please check your .env.local file.");
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
const csvFilePath = path.resolve(__dirname, '../data/airlines.csv');

// Keywords to filter out irrelevant entries like military, cargo, etc.
const bannedKeywords = [
  'air force', 'army', 'navy', 'military', 'government', 
  'authority', 'cargo', 'charter', 'express', 'logistics'
];

async function processCSVAndSeed() {
  const recordsToInsert = [];
  const parser = fs
    .createReadStream(csvFilePath)
    .pipe(parse({ delimiter: ',', from_line: 1 }));

  console.log("Reading and filtering airlines from CSV file...");

  for await (const record of parser) {
    const [id, name, alias, iata, icao, callsign, country, active] = record;

    const lowerCaseName = name.toLowerCase();
    const isBanned = bannedKeywords.some(keyword => lowerCaseName.includes(keyword));

    // Apply filters: must be active, have a valid IATA code and country, and not be banned
    if (active === 'Y' && iata && iata !== '\\N' && iata.length === 2 && country && country !== '\\N' && !isBanned) {
      recordsToInsert.push({
        name: name.trim(),
        slug: name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''),
        iata_code: iata.trim(),
        country: country.trim(),
        category: 'Aviation',
      });
    }
  }

  console.log(`Found ${recordsToInsert.length} relevant airlines to potentially seed.`);
  console.log("Checking for duplicates and inserting new companies only...");

  let insertedCount = 0;
  let skippedCount = 0;

  // Process records one by one to check for existence before inserting
  for (const record of recordsToInsert) {
    // Check if a company with this slug already exists
    const { data: existing, error: checkError } = await supabase
      .from('companies')
      .select('slug')
      .eq('slug', record.slug)
      .single();

    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 means "No rows found", which is not an error for us
      console.error(`Error checking for existing company ${record.name}:`, checkError.message);
      continue; // Skip this record on error
    }

    // If the company does not exist, insert it
    if (!existing) {
      const { error: insertError } = await supabase.from('companies').insert(record);
      if (insertError) {
        console.error(`Error inserting new company ${record.name}:`, insertError.message);
      } else {
        insertedCount++;
        console.log(`Inserted: ${record.name}`);
      }
    } else {
      skippedCount++;
    }
  }

  console.log('--- Seeding Complete ---');
  console.log(`Inserted ${insertedCount} new companies.`);
  console.log(`Skipped ${skippedCount} companies that already existed.`);
}

processCSVAndSeed();