import { seed, reset } from 'drizzle-seed'
import { db, sql } from './connection.ts'
import { schema } from './index.ts'

await reset(db, schema)

// Populando BD com dados fakes
await seed(db, schema).refine(f => {
  return {
    rooms: {
      count: 20,
      name: f.companyName,
      description: f.loremIpsum 
    }
  }
})

await sql.end()

// biome-ignore lint/suspicious/noConsole: only used in dev
console.log('data base seeded')