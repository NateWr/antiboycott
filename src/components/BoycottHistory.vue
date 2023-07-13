<script setup lang="ts">
import SpacerLine from './SpacerLine.vue'
import RosaParksWebp from '../assets/img/rosa-parks.png?w=165;330;250;500&format=webp&as=source&imagetools'
import RosaParksPng from '../assets/img/rosa-parks.png?w=165;330;250;500&format=png&as=source&imagetools'
import SupremeCourtWebp from '../assets/img/supreme-court.png?w=165;330;250;500&format=webp&as=source&imagetools'
import SupremeCourtPng from '../assets/img/supreme-court.png?w=165;330;250;500&format=png&as=source&imagetools'
import ContaminatedApartheidWebp from '../assets/img/contaminated-apartheid.png?w=165;330;250;500&format=webp&as=source&imagetools'
import ContaminatedApartheidPng from '../assets/img/contaminated-apartheid.png?w=165;330;250;500&format=png&as=source&imagetools'
import BdsSignWebp from '../assets/img/bds-sign.png?w=165;330;250;500&format=webp&as=source&imagetools'
import BdsSignPng from '../assets/img/bds-sign.png?w=165;330;250;500&format=png&as=source&imagetools'

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

const getSrc = ({src, w}: {src: string, w: number}) => `${src} ${w}w`

const RosaParksWebpSrc = RosaParksWebp.map(getSrc).join(',')
const RosaParksPngSrc = RosaParksPng.map(getSrc).join(',')
const SupremeCourtWebpSrc = SupremeCourtWebp.map(getSrc).join(',')
const SupremeCourtPngSrc = SupremeCourtPng.map(getSrc).join(',')
const ContaminatedApartheidWebpSrc = ContaminatedApartheidWebp.map(getSrc).join(',')
const ContaminatedApartheidPngSrc = ContaminatedApartheidPng.map(getSrc).join(',')
const BdsSignWebpSrc = BdsSignWebp.map(getSrc).join(',')
const BdsSignPngSrc = BdsSignPng.map(getSrc).join(',')

const imageSrcSizes = '(orientation: landscape) and (min-width: 992px) 250px, (orientation: landscape) 125px, (min-width: 720px) 250px, 165px';
</script>

<template>
  <div class="history">
    <div
      data-step="history-intro"
      :class="[
        'history-lead',
        'text-center',
        'fade',
        stepsStarted.includes('history-intro') ? 'fade-in' : 'fade-out'
      ]"
    >
      <h2 class="sr-only">Boycotts in U.S. History</h2>
      <p>
        Boycotts are a time-honored tool of <strong>political expression</strong> in the U.S.
      </p>
    </div>
    <SpacerLine
      name="history-spacer-1"
      :step="step"
      :steps-completed="stepsCompleted"
      :progress="progress"
    />
    <div
      data-step="history-montgomery"
      class="fade history-item"
      :class="[
        'fade',
        stepsStarted.includes('history-montgomery') ? 'fade-in' : 'fade-out'
      ]"
    >
      <picture class="history-image">
        <source
          type="image/webp"
          :srcset="RosaParksWebpSrc"
          :sizes="imageSrcSizes"
        />
        <source
          type="image/png"
          :srcset="RosaParksPngSrc"
          :sizes="imageSrcSizes"
        />
        <img
          :src="RosaParksPng[0].src"
          alt="Photo of Rosa Parks"
          loading="lazy"
          decoding="async"
          width="165"
          height="165"
        />
      </picture>
      <div class="history-details">
        <h3>
          <span class="history-year">1956</span>
          <span class="history-name">
            <span class="history-name-bg" aria-hidden="true" />
            <span class="history-name-text">Montgomery Bus</span>
          </span>
          <br />
          <span class="history-name">
            <span class="history-name-bg" aria-hidden="true" />
            <span class="history-name-text">Boycott</span>
          </span>
        </h3>
        <p class="history-desc">After Rosa Parks is arrested for refusing to surrender her seat to a white person, a year-long boycott of the public transit system compels the Supreme Court to declare the racist segregation of buses in Alabama unconstitutional.</p>
      </div>
    </div>
    <SpacerLine
      name="history-spacer-2"
      :step="step"
      :steps-completed="stepsCompleted"
      :progress="progress"
    />
    <div
      data-step="history-anti-apartheid"
      class="fade history-item"
      :class="[
        'fade',
        stepsStarted.includes('history-anti-apartheid') ? 'fade-in' : 'fade-out'
      ]"
    >
      <picture class="history-image">
        <source
          type="image/webp"
          :srcset="SupremeCourtWebpSrc"
          :sizes="imageSrcSizes"
        />
        <source
          type="image/png"
          :srcset="SupremeCourtPngSrc"
          :sizes="imageSrcSizes"
        />
        <img
          :src="SupremeCourtPng[0].src"
          alt="Photo of Rosa Parks"
          loading="lazy"
          decoding="async"
          width="165"
          height="165"
        />
      </picture>
      <div class="history-details">
        <h3>
          <span class="history-year">1982</span>
          <span class="history-name">
            <span class="history-name-bg" aria-hidden="true" />
            <span class="history-name-text">NAACP v. Claiborne</span>
          </span>
          <br />
          <span class="history-name">
            <span class="history-name-bg" aria-hidden="true" />
            <span class="history-name-text">Hardware</span>
          </span>
        </h3>
        <p class="history-desc">
          The Supreme Court unequivocally rules that politically motivated boycotts are protected under the First Amendment, in a case brought by the NAACP to protect the right to protest police brutality by boycotting white merchants.
        </p>
      </div>
    </div>
    <SpacerLine
      name="history-spacer-3"
      :step="step"
      :steps-completed="stepsCompleted"
      :progress="progress"
    />
    <div
      data-step="history-anti-apartheid"
      class="fade history-item"
      :class="[
        'fade',
        stepsStarted.includes('history-anti-apartheid') ? 'fade-in' : 'fade-out'
      ]"
    >
      <picture class="history-image">
        <source
          type="image/webp"
          :srcset="ContaminatedApartheidWebpSrc"
          :sizes="imageSrcSizes"
        />
        <source
          type="image/png"
          :srcset="ContaminatedApartheidPngSrc"
          :sizes="imageSrcSizes"
        />
        <img
          :src="ContaminatedApartheidPng[0].src"
          alt="Photo of Rosa Parks"
          loading="lazy"
          decoding="async"
          width="165"
          height="165"
        />
      </picture>
      <div class="history-details">
        <h3>
          <span class="history-year">1986</span>
          <span class="history-name">
            <span class="history-name-bg" aria-hidden="true" />
            <span class="history-name-text">Anti-Apartheid</span>
          </span>
          <br />
          <span class="history-name">
            <span class="history-name-bg" aria-hidden="true" />
            <span class="history-name-text">Movement</span>
          </span>
        </h3>
        <p class="history-desc">Americans launch economic, social and cultural boycotts of South Africa that lead Congress to pass the Comprehensive Anti-Apartheid Act, overruling President Reagan’s veto to do so.</p>
      </div>
    </div>
    <SpacerLine
      name="history-spacer-4"
      :step="step"
      :steps-completed="stepsCompleted"
      :progress="progress"
    />
    <div
      data-step="history-bds"
      class="fade history-item"
      :class="[
        'fade',
        stepsStarted.includes('history-bds') ? 'fade-in' : 'fade-out'
      ]"
    >
      <picture class="history-image">
        <source
          type="image/webp"
          :srcset="BdsSignWebpSrc"
          :sizes="imageSrcSizes"
        />
        <source
          type="image/png"
          :srcset="BdsSignPngSrc"
          :sizes="imageSrcSizes"
        />
        <img
          :src="BdsSignPng[0].src"
          alt="Photo of Rosa Parks"
          loading="lazy"
          decoding="async"
          width="165"
          height="165"
        />
      </picture>
      <div class="history-details">
        <h3>
          <span class="history-year">2014</span>
          <span class="history-name">
            <span class="history-name-bg" aria-hidden="true" />
            <span class="history-name-text">Boycott, Divestment,</span>
          </span>
          <br />
          <span class="history-name">
            <span class="history-name-bg" aria-hidden="true" />
            <span class="history-name-text">Sanctions</span>
          </span>
        </h3>
        <p class="history-desc">A growing number of Americans support Boycott, Divestment, and Sanctions (BDS) campaigns that target Israel’s regime of settler colonialism, military occupation, and apartheid over the Palestinian people.</p>
      </div>
    </div>
    <SpacerLine
      name="history-spacer-5"
      :step="step"
      :steps-completed="stepsCompleted"
      :progress="progress"
    />
    <div
      data-step="history-outro"
      class="fade"
      :class="[
        'history-lead',
        'text-center',
        'fade',
        stepsStarted.includes('history-outro') ? 'fade-in' : 'fade-out'
      ]"
    >
      <p>
        That year, Democratic and Republican lawmakers begin introducing anti-boycott bills to suppress boycotts that support
        <span class="txt-highlight txt-highlight-blue">Palestinian rights</span>
      </p>
    </div>
  </div>
</template>

<style lang="postcss">
@import '../assets/css/variables.css';

.history {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10rem 1rem;
}

.history-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.history-lead {
  max-width: 35rem;
  font-size: 1.5rem;
  line-height: 1.5;
  font-weight: var(--txt-semibold);
}

.history-image {

  & img {
    opacity: 0;
    transform: translateY(50px);
    width: 165px;
    height: auto;
    transition: all 0.6s;
  }
}

.history-details {
  text-align: center;
}

.history-year {
  display: block;
  margin-bottom: 1rem;
  font-size: 2.25rem;
  line-height: 1;
  font-weight: var(--txt-regular);
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.6s 0.3s;
}

.history-name {
  position: relative;
  display: inline-block;
  font-size: 1.25rem;
  line-height: 1.5;
  text-transform: uppercase;
  font-weight: var(--txt-black);
}

.history-name-bg {
  position: absolute;
  top: 0;
  left: 50%;
  width: 0;
  height: 100%;
  transform: translateX(-50%);
  mix-blend-mode: difference;
  background: var(--color-orange-blend-difference);
  transition: width 0.3s 0.6s;
}

.history-name-text {
  position: relative;
  padding-left: 0.2em;
  padding-right: 0.2em;
  color: transparent;
  transition: color 0.3s 0.9s;
}

.history-desc {
  margin-top: 1rem;
  font-size: 1.25rem;
  line-height: 1.8;
  text-align: left;
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.3s 1.2s;
}

.fade-in {

  & .history-image img,
  & .history-year,
  & .history-desc {
    opacity: 1;
    transform: translateY(0);
  }

  & .history-name-bg {
    width: 100%;
  }

  & .history-name-text {
    color: var(--color-black);
  }
}

@media (orientation: portrait) {

  .history-item {
    max-width: 30rem;
  }

  @media (--tablets-sm) {
    .history {
      padding-top: 20rem;
      padding-bottom: 20rem;
    }

    .history-lead {
      font-size: 2.25rem;
    }

    .history-item {
      max-width: 40rem;
    }

    .history-img img {
      width: 250px;
    }

    .history-year {
      font-size: 3rem;
    }

    .history-name-text {
      font-size: 2rem;
    }

    .history-desc {
      font-size: 2rem;
    }
  }
}

@media (orientation: landscape) {
  .history-item {
    display: grid;
    grid-template-columns: 125px auto;
    gap: 2rem;
    align-items: flex-start;
    max-width: 45rem;
  }

  .history-image img {
    width: 125px;
  }

  .history-details {
    display: block;
    text-align: left;
  }

  .history-desc {
    line-height: 1.5;
  }

  @media(--tablets-landscape) {

    .history-lead {
      font-size: 2.25rem;
    }

    .history-item {
      grid-template-columns: 250px auto;
      gap: 3rem;
      align-items: flex-start;
      max-width: 65rem;
    }

    .history-image img {
      width: 250px;
    }

    .history-year {
      font-size: 3rem;
    }

    .history-name-text {
      font-size: 2rem;
    }

    .history-desc {
      font-size: 1.8rem;
    }
  }
}
</style>
