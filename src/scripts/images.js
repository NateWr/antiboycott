import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

const outputDir = './public/img'

// Clean up existing files
fs.readdirSync(outputDir)
  .forEach(file => {
    if (!file.includes('.svg')) {
      fs.rmSync(
        path.join(outputDir, file)
      )
    }
  })

/**
 * Generate responsive image sizes for the hero image
 */
const processHeroImage = () => {

  const slug = 'boycott-israel-march';
  const source = `./src/assets/img/${slug}.png`
  const maxHeight = 827;
  const maxWidth = 1771
  const portrait = [450, maxHeight]
  const landscape = [700, 992, 1280, 1440, 1600, maxWidth]

  // Crop portrait sizes so that they are centred
  // on the word Boycott in the banner
  portrait.forEach(size => {
      const filename = `${slug}-portrait-${size}w`
      const image = sharp(source);
      image.metadata()
        .then(metadata => {
          return image
            .extract({
              top: 0,
              left: 0,
              width: Math.round(metadata.width * 0.77),
              height: metadata.height
            })
            .resize(size, 827)
            .jpeg({mozjpeg: true, quality: 60})
            .toFile(`${outputDir}/${filename}.jpg`)
        })
    })

  landscape.forEach(size => {
    const filename = `${slug}-${size}w`
    sharp(source)
      .resize(size)
      .jpeg({mozjpeg: true, quality: 60})
      .toFile(`${outputDir}/${filename}.jpg`)
  })
}

/**
 * Run file compression on the background texture
 */
const processBackground = () => {
  const slug = 'background';
  const source = `./src/assets/img/${slug}.png`
  sharp(source)
    .jpeg({mozjpeg: true, quality: 90})
    .toFile(`${outputDir}/${slug}.jpg`)
}

/**
 * Generate responsive image sizes for bill's paper background
 */
const processPaper = () => {
  const slug = 'paper-background';
  const source = `./src/assets/img/${slug}.png`
  const widths = [400, 600, 800, 1200]

  widths.forEach(size => {
    const filename = `${slug}-${size}w`
    sharp(source)
      .resize(size)
      .webp({quality: 70})
      .toFile(`${outputDir}/${filename}.webp`)
  })
}

/**
 * Run file compression on the OpenGraph image
 */
const processOGImage = () => {
  const slug = 'og-image';
  const source = `./src/assets/img/${slug}.png`
  sharp(source)
    .png()
    .toFile(`${outputDir}/${slug}.png`)
}

/**
 * Generate the site icon images
 */
const processSiteIcon = () => {
  const slug = 'site-icon'
  const source = `./src/assets/img/${slug}.jpg`
  const widths = [32, 180, 192, 300]

  widths.forEach(size => {
    const filename = `${slug}-${size}w`
    sharp(source)
      .resize(size)
      .png({quality: 70})
      .toFile(`${outputDir}/${filename}.png`)
  })
}

processHeroImage()
processBackground()
processPaper()
processOGImage()
processSiteIcon()
