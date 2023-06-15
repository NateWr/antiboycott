import PublicGoogleSheetsParser from 'public-google-sheets-parser'
import fs from 'fs'
import { DEAD, DEFEATED, INEFFECT, PENDING } from '../helpers/billStatus.js'
import { ISRAEL, GUNS, FOSSIL, ESG } from '../helpers/categories.js'

const spreadsheetId = '1qakaQTJFqWjHhY6hh4DdJTCxOHJb6L1UL3SgEaS3Th8'
const tabId = '662340676'

const statusMap = {
  'Dead': DEAD,
  'Struck Down': DEFEATED,
  'In Effect': INEFFECT,
  'Pending': PENDING,
}

const categoryMap = {
  'Israel': ISRAEL,
  'Multiple Boycotts/ESG': ESG,
  'Fossil Fuels': FOSSIL,
  'Gun': GUNS,
}

const getStatus = (status) => {
  if (!statusMap[status]) {
    throw Error(`The status ${status} is not valid`)
  }
  return statusMap[status]
}

const getCategory = (category) => {
  if (!categoryMap[category]) {
    throw Error(`The category ${category} is not valid`)
  }
  return categoryMap[category]
}

/**
 * Get the date of a law in YYYY-MM-DD
 *
 * Overrides the date for SB 513 to use correct date in 2017.
 *
 * @see https://encyclopediaofarkansas.net/entries/act-710-of-2017-14203/
 */
const getDate = (law) => {
  const dateString = law['Legislation Name'] === 'SB 513'
    ? 'Date(2017,02,28)'
    : law['MM/YYYY']
  let parts = dateString
    .replace('Date(', '')
    .replace(')', '')
    .split(',')
  parts[1] = parseInt(parts[1], 10) + 1
  return new Date(parts.join('-'))
}

const parser = new PublicGoogleSheetsParser()
parser.parse(spreadsheetId, {sheetId: tabId}).then((items) => {
  const laws = items
    .map(law => {
      const date = getDate(law)
      return {
        name: law['Legislation Name'],
        state: law.State,
        category: getCategory(law.Category),
        year: date.getFullYear(),
        date: date.toISOString().split('T')[0],
        status: getStatus(law.Status),
        url: law['Law Details'] ? law['Law Details'] : ''
      }
    })
    .sort((a, b) => a.date >= b.date)

  fs.writeFileSync('public/laws.json', JSON.stringify(laws))
})

