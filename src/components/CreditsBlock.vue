<script setup lang="ts">
import SpacerLine from './SpacerLine.vue'
import FilmWebp from '../assets/img/boycott-film.png?w=200;350;400;700&format=webp&as=source&imagetools'
import FilmJpg from '../assets/img/boycott-film.png?w=200;350;400;700&format=jpg&as=source&imagetools'
import PlaySvg from '../assets/img/play.svg'
import JustVisionWebp from '../assets/img/just-vision-logo.png?w=200;400&format=webp&as=source&imagetools'
import JustVisionPng from '../assets/img/just-vision-logo.png?w=200;400&format=png&as=source&imagetools'
import UsaStatesWebp from '../assets/img/usa-states.png?w=250;500&format=webp&as=source&imagetools'
import UsaStatesPng from '../assets/img/usa-states.png?w=250;500&format=png&as=source&imagetools'
import PalestineLegalLogo from '../assets/img/palestine-legal-logo.svg'
import VPLogoWebp from '../assets/img/vp-logo.png?w=340,680&format=webp&as=source&imagetools'
import VPLogoPng from '../assets/img/vp-logo.png?w=340,680&format=webp&as=source&imagetools'
import CCIcon from '../assets/img/cc.svg'
import ByIcon from '../assets/img/by.svg'
import NCIcon from '../assets/img/nc.svg'
import NDIcon from '../assets/img/nd.svg'
import FacebookIcon from '../assets/img/square-facebook.svg'
import InstagramIcon from '../assets/img/square-instagram.svg'
import TwitterIcon from '../assets/img/square-twitter.svg'

const props = defineProps({
  progress: {
    type: Number,
    required: true,
  },
  step: {
    type: String,
    default: ''
  },
  stepsCompleted: {
    type: Array<String>,
    required: true
  },
  stepsStarted: {
    type: Array<String>,
    required: true
  }
})

const FilmWebpSrc = FilmWebp
  .map(({src, w}) => `${src} ${w}w`)
  .join(',')

const FilmJpgSrc = FilmJpg
  .map(({src, w}) => `${src} ${w}w`)
  .join(',')

const FilmImageSrcSizes = '(orientation: landscape) and (min-width: 1024px) 350, (orientation: landscape) 150px, (min-width: 720px) 350, 200px';

const JustVisionWebpSrc = JustVisionWebp
  .map(({src, w}) => `${src} ${w}w`)
  .join(',')

const JustVisionPngSrc = JustVisionPng
  .map(({src, w}) => `${src} ${w}w`)
  .join(',')

const JustVisionImageSrcSizes = '(orientation: landscape) and (min-width: 1024px) 200px, (orientation: landscape) 100px, (min-width: 720px) 200px, 100px';

const UsaStatesWebpSrc = UsaStatesWebp
  .map(({src, w}) => `${src} ${w}w`)
  .join(',')

const UsaStatesPngSrc = UsaStatesPng
  .map(({src, w}) => `${src} ${w}w`)
  .join(',')

const UsaStatesImageSrcSizes = '(orientation: landscape) and (min-width: 1024px) 200px, (orientation: landscape) 100px, (min-width: 720px) 200px, 100px';

const VPLogoWebpSrc = VPLogoWebp
  .map(({src, w}) => `${src} ${w}w`)
  .join(',')

const VPLogoPngSrc = VPLogoPng
  .map(({src, w}) => `${src} ${w}w`)
  .join(',')

const VPLogoImageSrcSizes = '(orientation: landscape) and (min-width: 1024px) 200px, (orientation: landscape) 100px, (min-width: 720px) 200px, 100px';
</script>

<template>
  <div class="credits">
    <div
      data-step="learn-more"
      :class="[
        'credits-item',
        stepsStarted.includes('learn-more') ? 'credits-item-in' : 'credits-item-out'
      ]"
    >
      <h2 class="credits-title">
        <span class="credits-slide">Want to</span>
        <br />
        <span class="credits-unroll">
          <span class="credits-unroll-bg" aria-hidden="true"></span>
          <span class="credits-unroll-text">learn more?</span>
        </span>
      </h2>
    </div>
    <SpacerLine
      name="credits-spacer-1"
      :step="step"
      :steps-completed="stepsCompleted"
      :progress="progress"
    />
    <a
      data-step="credits-film"
      class="credits-item"
      :class="stepsStarted.includes('credits-film') ? 'credits-item-in' : 'credits-item-out'"
      href="https://justvision.org/boycott"
    >
      <div class="credits-image credits-slide">
        <picture>
          <source
            type="image/webp"
            :srcset="FilmWebpSrc"
            :sizes="FilmImageSrcSizes"
          />
          <source
            type="image/png"
            :srcset="FilmJpgSrc"
            :sizes="FilmImageSrcSizes"
          />
          <img
            :src="FilmJpgSrc[0].src"
            alt="Still from the film Boycott showing the U.S. Capitol building"
            loading="lazy"
            decoding="async"
            width="2000"
            height="1500"
            class="credits-image-film"
          />
        </picture>
        <PlaySvg class="credits-image-play" />
      </div>
      <h3 class="credits-item-title credits-unroll">
        <span class="credits-unroll-bg" aria-hidden="true" />
        <span class="credits-unroll-text">Boycott</span>
      </h3>
      <p class="credits-desc credits-slide">
        A documentary that chronicles the personal histories and legal battles of three <strong>“accidental plaintiffs”</strong> challenging anti-boycott laws.
      </p>
      <picture class="credits-logo credits-logo-just-vision credits-slide">
        <source
          type="image/webp"
          :srcset="JustVisionWebpSrc"
          :sizes="JustVisionImageSrcSizes"
        />
        <source
          type="image/png"
          :srcset="JustVisionPngSrc"
          :sizes="JustVisionImageSrcSizes"
        />
        <img
          :src="JustVisionPngSrc[0].src"
          alt="Logo for Just Vision"
          loading="lazy"
          decoding="async"
          width="459"
          height="84"
        />
      </picture>
    </a>
    <SpacerLine
      name="credits-spacer-2"
      :step="step"
      :steps-completed="stepsCompleted"
      :progress="progress"
    />
    <a
      data-step="credits-tracker"
      class="credits-item"
      :class="stepsStarted.includes('credits-tracker') ? 'credits-item-in' : 'credits-item-out'"
      href="https://legislation.palestinelegal.org"
    >
      <picture class="credits-image credits-slide">
        <source
          type="image/webp"
          :srcset="UsaStatesWebpSrc"
          :sizes="UsaStatesImageSrcSizes"
        />
        <source
          type="image/png"
          :srcset="UsaStatesPngSrc"
          :sizes="UsaStatesImageSrcSizes"
        />
        <img
          :src="UsaStatesPngSrc[0].src"
          alt="An outline of the United States showing each state's boundaries"
          loading="lazy"
          decoding="async"
          width="700"
          height="407"
          class="credits-image-tracker"
        />
      </picture>
      <h3 class="credits-item-title credits-unroll">
        <span class="credits-unroll-bg" aria-hidden="true" />
        <span class="credits-unroll-text">Legal Tracker</span>
      </h3>
      <p class="credits-desc credits-slide">
        Track <strong>every bill</strong> that is pending, in effect or defeated in your state and at the federal level.
      </p>
      <PalestineLegalLogo class="credits-logo credits-logo-palestine-legal credits-slide" />
    </a>
    <SpacerLine
      name="credits-spacer-3"
      :step="step"
      :steps-completed="stepsCompleted"
      :progress="progress"
    />
    <div
      data-step="credits-vp"
      class="credits-item credits-end"
    >
      <h2 class="sr-only">About</h2>
      <div class="credits-group">
        <h3 class="credits-heading">
          Produced by
          <span class="sr-only">Visualizing Palestine</span>
        </h3>
        <a href="https://www.visualizingpalestine.org">
          <picture class="credits-logo-vp">
            <source
              type="image/webp"
              :srcset="VPLogoWebpSrc"
              :sizes="VPLogoImageSrcSizes"
            />
            <source
              type="image/png"
              :srcset="VPLogoPngSrc"
              :sizes="VPLogoImageSrcSizes"
            />
            <img
              :src="VPLogoPng[0].src"
              alt="Logo for Visualizing Palestine"
              loading="lazy"
              decoding="async"
              width="303"
              height="20"
            />
          </picture>
        </a>
        <div class="credits-socials">
          <a href="https://twitter.com/visualizingpal">
            <TwitterIcon />
          </a>
          <a href="https://www.instagram.com/visualizing_palestine">
            <InstagramIcon />
          </a>
          <a href="https://www.facebook.com/visualizingpalestine">
            <FacebookIcon />
          </a>
        </div>
      </div>
      <div class="credits-group">
        <h3 class="credits-heading">Sources</h3>
        <p class="sources">
          <a href="https://bit.ly/vp-boycott-laws">bit.ly/vp-boycott-laws</a>
        </p>
      </div>
      <div class="credits-group">
        <h3 class="credits-heading">About</h3>
        <p>
          Visualizing Palestine uses data and research to visually communicate Palestinian experiences to provoke narrative change.
        </p>
        <p>
          VP envisions a liberated future for Palestinians in a world free from oppression.
          <a href="https://www.visualizingpalestine.org/" class="credits-end-text-link">
            Learn more
          </a>
        </p>
      </div>
      <div class="credits-group">
        <h3 class="sr-only">
          License
        </h3>
        <a class="credits-license" href="https://creativecommons.org/licenses/by-nc-nd/2.0/">
          <span class="sr-only">
            CC BY-NC-ND 2.0
          </span>
          <CCIcon aria-hidden="true" />
          <ByIcon aria-hidden="true" />
          <NCIcon aria-hidden="true" />
          <NDIcon aria-hidden="true" />
        </a>
        <div class="credits-date">
          April 2023
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
@import '../assets/css/variables.css';

.credits {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10rem 1rem;
  background: linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0) 25%, rgba(0,0,0,0))
}

.credits-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  max-width: 35rem;
  text-align: center;
  font-weight: var(--txt-regular);
}

.credits-title {
  font-size: 2rem;
  line-height: 1.1;
  font-weight: var(--txt-black);
  text-transform: uppercase;
}

.credits-item-title {
  font-size: 1.2rem;
  line-height: 1.2;
  font-weight: var(--txt-black);
  text-transform: uppercase;
}

.credits-image {
  position: relative;
}

.credits-image-film {
  display: block;
  width: 200px;
  height: auto;
  border-radius: 4px;
  border: 1px solid var(--color-blue);
  opacity: 0.7;
  background: rgba(0,0,0,0.5);
}

.credits-image-play {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: auto;
  height: 35%;
  fill: var(--color-white);
}

.credits-desc {
  font-size: 1.25rem;
}

.credits-logo-just-vision img {
  width: 100px;
  height: auto;
}

.credits-image-tracker {
  width: 250px;
  height: auto;
}

.credits-logo-palestine-legal {
  width: 100px;
  height: auto;

  & g {
    color: rgba(255,255,255,0.8);
  }
}

.credits-end {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5rem;
}

.credits-heading {
  margin: 0.5rem;
  font-size: 0.75rem;
  font-weight: var(--txt-black);
  letter-spacing: 0.1em;
  color: var(--color-orange);
  text-transform: uppercase;
}

.credits-group > p + p {
  margin-top: 1rem;
}

.credits-logo-vp img {
  width: 300px;
  height: auto;
}

.credits-socials {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 0.5rem;

  & svg {
    width: 1.5rem;
    height: auto;
    fill: var(--color-white);
  }
}

.credits-end-text-link {
  text-decoration: underline;
  text-decoration-thickness: 0.1em;
}

.credits-license {
  display: flex;
  justify-content: center;
  gap: 0.25rem;

  & svg {
    width: 2rem;
    height: 2rem;

    & circle {
      fill: transparent;
    }

    & path {
      fill: var(--color-white);
    }
  }
}

.credits-date {
  margin: 1rem;
  font-size: 0.75rem;
  font-weight: var(--txt-black);
  letter-spacing: 0.1em;
  color: var(--color-white);
  text-transform: uppercase;
}

.credits-slide {
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.6s;
}

.credits-unroll {
  position: relative;
}

.credits-unroll-bg {
  position: absolute;
  top: 0;
  left: 50%;
  width: 0;
  height: 100%;
  transform: translateX(-50%);
  mix-blend-mode: difference;
  background: var(--color-orange-blend-difference);
  transition: width 0.3s 0.3s;
}

.credits-unroll-text {
  position: relative;
  padding-left: 0.2em;
  padding-right: 0.2em;
  color: transparent;
  transition: color 0.3s 0.6s;
}

.credits-desc {
  transition-delay: 0.8s;
}

.credits-logo {
  transition-delay: 1.2s;
}

.credits-item-in {

  & .credits-slide {
    opacity: 1;
    transform: translateY(0)
  }

  & .credits-unroll-bg {
    width: 100%;
  }

  & .credits-unroll-text {
    color: var(--color-black);
  }
}

@media
  (orientation: portrait) and (--tablets-sm),
  (orientation: landscape) and (--tablets-landscape)
{

  .credits {
    padding-top: 20rem;
  }

  .credits-item {
    gap: 2rem;
  }

  .credits-title {
    font-size: 4rem;
  }

  .credits-image-film {
    width: 350px;
  }

  .credits-item-title {
    font-size: 2.5rem;
  }

  .credits-desc {
    font-size: 2rem;
  }

  .credits-logo-just-vision img,
  .credits-logo-palestine-legal {
    width: 200px;
  }

  .credits-image-tracker {
    width: 435px;
  }

  .credits-heading {
    font-size: 1rem;
  }
}
</style>
