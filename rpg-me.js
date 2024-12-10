import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "@haxtheweb/rpg-character/rpg-character.js";
import 'wired-elements/lib/wired-slider.js';
import 'wired-elements/lib/wired-checkbox.js';
import 'wired-elements/lib/wired-combo.js';
import 'wired-elements/lib/wired-item.js';

export class RpgMe extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "rpg-me";
  }

  constructor() {
    super();
    this.characteristics = {
      accessories: 0,
      base: 0,
      leg: "",
      face: 0,
      faceItem: 0,
      hair: 0,
      pants: 0,
      shirt: 0,
      skin: 0,
      hatColor: 0,
      hat: "none",
      fire: false,
      walking: false,
      circle: false
    };
  }

  static get properties() {
    return {
      ...super.properties,
      characteristics: { type: Object }
    };
  }

  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-default-white);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
        display: flex;
        flex-direction: row;
      }
      .character-box {
        flex: 1;
        margin-right: var(--ddd-spacing-4);
        padding: var(--ddd-spacing-2);
        border-radius: var(--ddd-radius-md);
        display: flex;
        flex-direction: column;
        align-items: center; 
        justify-content: center; 
      }
      rpg-character {
        transform: scale(2);
        margin: var(--ddd-spacing-16);
      }
      .elements-box {
        text-align: left;
        padding: var(--ddd-spacing-2);
        border-radius: var(--ddd-radius-md);
        display: flex;
        flex-direction: column;
      }
      label {
        font-size: var(--ddd-font-size-s);
      }
      wired-combo {
        color: white;
      }
      .seed {
        margin-top: var(--ddd-spacing-4);
        margin-bottom: var(--ddd-spacing-4);
      }
    `];
  }

  render() {
    return html`
    <div class="wrapper">
      <div class="character-box">
        <rpg-character
          .seed="${this.seed}"
          .accessories="${this.characteristics.accessories}"
          .base="${this.characteristics.base}"
          .leg="${this.characteristics.leg}"
          .face="${this.characteristics.face}"
          .faceItem="${this.characteristics.faceItem}"
          .hair="${this.characteristics.hair}"
          .pants="${this.characteristics.pants}"
          .shirt="${this.characteristics.shirt}"
          .skin="${this.characteristics.skin}"
          .hatColor="${this.characteristics.hatColor}"
          .walking="${this.characteristics.walking}"
          .speed="${this.characteristics.speed}"
          .circle="${this.characteristics.circle}"
          .fire="${this.characteristics.fire}">
        </rpg-character>
        <div class="seed">Seed: [seed here]</div>
        <wired-button id="share-button">Share</wired-button>
      </div>
      <div class="elements-box">
        <label for="accessories">Accessories</label>
          <wired-slider 
            id="accessories" 
            min="0" 
            max="10" 
            step="1"
            .value="${this.characteristics.accessories}"
            @change="${(e) => this._onElementChange(e, 'accessories')}">
          </wired-slider>
        <label for="base">Base</label>
          <wired-slider 
            id="base" 
            min="1" 
            max="5" 
            step="4"
            .value="${this.characteristics.base}"
            @change="${(e) => this._onElementChange(e, 'base')}">
          </wired-slider>
        <label for="face">Face</label>
          <wired-slider 
            id="face" 
            min="0" 
            max="5" 
            step="1"
            .value="${this.characteristics.face}"
            @change="${(e) => this._onElementChange(e, 'face')}">
          </wired-slider>
        <label for="faceItem">Face Item</label>
          <wired-slider 
            id="faceItem" 
            min="0" 
            max="10"
            step="1"
            .value="${this.characteristics.faceItem}"
            @change="${(e) => this._onElementChange(e, 'faceItem')}">
          </wired-slider>
        <label for="hair">Hair</label>
          <wired-slider 
            id="hair" 
            min="0" 
            max="10" 
            step="1"
            .value="${this.characteristics.hair}"
            @change="${(e) => this._onElementChange(e, 'hair')}">
          </wired-slider>
        <label for="pants">Pants</label>
          <wired-slider 
            id="pants" 
            min="0" 
            max="10" 
            step="1"
            .value="${this.characteristics.pants}"
            @change="${(e) => this._onElementChange(e, 'pants')}">
          </wired-slider>
        <label for="shirt">Shirt</label>
          <wired-slider 
            id="shirt" 
            min="0" 
            max="10" 
            step="1"
            .value="${this.characteristics.shirt}"
            @change="${(e) => this._onElementChange(e, 'shirt')}">
          </wired-slider>
        <label for="skin">Skin</label>
          <wired-slider 
            id="skin" 
            min="0" 
            max="10" 
            step="1"
            .value="${this.characteristics.skin}"
            @change="${(e) => this._onElementChange(e, 'skin')}">
          </wired-slider>
        <label for="hatColor">Hat Color</label>
          <wired-slider 
            id="hatColor" 
            min="0" 
            max="10" 
            step="1"
            .value="${this.characteristics.hatColor}"
            @change="${(e) => this._onElementChange(e, 'hatColor')}">
          </wired-slider>
        <label for="hat">Hat</label>
          <wired-combo id="hat">
            <wired-item value="none">None</wired-item>
            <wired-item value="bunny">Bunny</wired-item>
            <wired-item value="coffee">Coffee</wired-item>
            <wired-item value="construction">Construction</wired-item>
            <wired-item value="cowboy">Cowboy</wired-item>
            <wired-item value="education">Education</wired-item>
            <wired-item value="knight">Knight</wired-item>
            <wired-item value="ninja">Ninja</wired-item>
            <wired-item value="party">Party</wired-item>
            <wired-item value="pirate">Pirate</wired-item>
            <wired-item value="watermelon">Watermelon</wired-item>
          </wired-combo>
        <wired-checkbox 
          id="fire"
          .checked="${this.characteristics.fire}"
          @change="${(e) => this._onCheckboxChange(e, 'fire')}"
          >On Fire</wired-checkbox>
        <wired-checkbox 
          id="walking"
          .checked="${this.characteristics.walking}"
          @change="${(e) => this._onCheckboxChange(e, 'walking')}"
          >Walking</wired-checkbox>
        <wired-checkbox 
          id="circle"
          .checked="${this.characteristics.circle}"
          @change="${(e) => this._onCheckboxChange(e, 'circle')}"
        >Circle</wired-checkbox>
      </div>
    </div>`;
  }

  _onElementChange(event, prop) {
    console.log(`Property changed: ${prop}, Value: ${event.target.value}`);
    const slider = event.composedPath()[0];
    const value = slider.value;
    this.characteristics = {
      ...this.characteristics,
      [prop]: parseInt(value, 10),
    };
    this.requestUpdate();
  }

  _onCheckboxChange(event, prop) {
    const checkbox = event.target;
    this.characteristics = {
      ...this.characteristics,
      [prop]: checkbox.checked,
    };
    this.requestUpdate();
  }

  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(RpgMe.tag, RpgMe);