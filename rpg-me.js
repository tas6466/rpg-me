import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "@haxtheweb/rpg-character/rpg-character.js";
import { WiredButton, WiredInput } from "wired-elements";
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
      seed: "0000000000",
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
    this._applySeed(); 
  }

  static get properties() {
    return {
      ...super.properties,
      characteristics: { type: Object },
    };
  }

  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-default-black);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-secondary);
      }
      .wrapper {
        display: flex;
        padding: var(--ddd-spacing-4);
      }
      .character-box {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: var(--ddd-spacing-4);
        background-color: var(--ddd-theme-default-pughBlue);
        border-radius: var(--ddd-radius-md);
        outline-style: double;
        outline-color: var(--ddd-theme-default-potential70);
        outline-width: var(--ddd-spacing-4);
        box-sizing: border-box;
      }
      rpg-character {
        transform: scale(2.5);
        margin: var(--ddd-spacing-24);
      }
      .seed, #share-button, a {
        padding: var(--ddd-spacing-2);
      }
      #share-button {
        font-size: var(--ddd-font-size-md);
      }
      .elements-box {
        flex: 2;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: var(--ddd-theme-default-skyLight);
        border-radius: var(--ddd-radius-md);
        margin-left: var(--ddd-spacing-12);
        outline-style: double;
        outline-color: var(--ddd-theme-default-potential70);
        outline-width: var(--ddd-spacing-4);
      }
      table {
        width: 100%;
        height: 80%;
        border-spacing: var(--ddd-spacing-5);
        table-layout: fixed;
      }
      td {
        vertical-align: top;
        width: 33%;
        font-family: var(--ddd-font-secondary);
      }
      label {
        font-size: 28px;
        display: block;
        margin-bottom: var(--ddd-spacing-3);
        font-family: var(--ddd-font-secondary);
      }
      wired-slider, wired-combo {
        width: 100%;
        height: 40px;
        margin-bottom: var(--ddd-spacing-6);
        font-family: var(--ddd-font-secondary);
      }
      wired-checkbox {
        height: auto;
        margin-top: var(--ddd-spacing-4);
        margin-bottom: var(--ddd-spacing-4);
        font-family: var(--ddd-font-secondary);
      }
      wired-item {
        opacity: 1;
      }
      .notification {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background-color: #28a745;
          color: white;
          padding: 10px 15px;
          border-radius: 5px;
          font-size: 14px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
          z-index: 1000;
        }
        .notification.show {
          opacity: 1;
        }
    `];
  }

  render() {
    return html`
    <div class="wrapper">
      <div class="character-box">
        <rpg-character
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
          .hat="${this.characteristics.hat}"
          .walking="${this.characteristics.walking}"
          .speed="${this.characteristics.speed}"
          .circle="${this.characteristics.circle}"
          .fire="${this.characteristics.fire}">
        </rpg-character>
        <div class="seed">Seed: ${this.characteristics.seed}</div>
        <wired-button id="share-button" @click="${this._generateLink}">Share</wired-button>
        <a href="https://github.com/haxtheweb/issues/issues/1414" target="_blank">Issue</a>
      </div>
      <div id="notification" class="notification"></div>
      <div class="elements-box">
        <table>
          <tr>
            <td>
              <label for="accessories">Accessories</label>
                <wired-slider id="accessories" .value="${this.characteristics.accessories}" min="0" max="9"  
                  @change="${(e) => this._updateSetting('accessories', parseInt(e.detail.value))}">
                </wired-slider>
                <label for="base">Hair</label>
                <wired-slider id="base" .value="${this.characteristics.base}" min="0" max="1" 
                  @change="${(e) => this._updateSetting('base', parseInt(e.detail.value))}">
                </wired-slider>
              <label for="face">Face</label>
                <wired-slider id="face" .value="${this.characteristics.face}" min="0" max="5" 
                  @change="${(e) => this._updateSetting('face', parseInt(e.detail.value))}">
                </wired-slider>
                <wired-checkbox id="fire" ?checked="${this.characteristics.fire === 1}"
                  @change="${(e) => this._updateSetting('fire', e.target.checked ? 1 : 0)}">On Fire
                </wired-checkbox>
                <wired-checkbox id="walking" ?checked="${this.characteristics.walking === 1}"
                  @change="${(e) => this._updateSetting('walking', e.target.checked ? 1 : 0)}">Walking
                </wired-checkbox>
                <wired-checkbox id="circle" ?checked="${this.characteristics.circle === 1}"
                  @change="${(e) => this._updateSetting('circle', e.target.checked ? 1 : 0)}">Circle
                </wired-checkbox>
            </td>
            <td>
              <label for="faceItem">Face Item</label>
                <wired-slider id="faceItem" .value="${this.characteristics.faceItem}" min="0" max="9"
                  @change="${(e) => this._updateSetting('faceItem', parseInt(e.detail.value))}">
                </wired-slider>
              <label for="hair">Hair Color</label>
                <wired-slider id="hair" .value="${this.characteristics.hair}" min="0" max="9"
                  @change="${(e) => this._updateSetting('hair', parseInt(e.detail.value))}">
                </wired-slider>
              <label for="pants">Pants</label>
                <wired-slider id="pants" min="0" max="9" step="1"
                  .value="${this.characteristics.pants}"
                  @change="${(e) => this._updateSetting('pants', parseInt(e.detail.value))}">
                </wired-slider>
              <label for="hatColor">Hat Color</label>
                <wired-slider id="hatColor" .value="${this.characteristics.hatColor}" min="0" max="9"
                  @change="${(e) => this._updateSetting('hatColor', parseInt(e.detail.value))}">
                </wired-slider>  
            </td>
            <td>
              <label for="hat">Hat</label>
                <wired-combo id="hat" .value="${this.characteristics.hat}"
                @change="${(e) => this._updateSetting('hat', parseInt(e.detail.value))}">
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
                <label for="shirt">Shirt</label>
                <wired-slider id="shirt" .value="${this.characteristics.shirt}" min="0" max="9"
                  @change="${(e) => this._updateSetting('shirt', parseInt(e.detail.value))}">
                </wired-slider>
                <label for="skin">Skin</label>
                <wired-slider id="skin" .value="${this.characteristics.skin}" min="0" max="9"
                  @change="${(e) => this._updateSetting('skin', parseInt(e.detail.value))}">
                </wired-slider>
            </td>
          </tr>
        </table>
      </div>
    </div>`;
  }

  _applySeed() {
    const seed = this.characteristics.seed;
    const paddedSeed = seed.padStart(10, "0").slice(0, 10);
    const values = paddedSeed.split("").map((v) => parseInt(v, 10));
  
    [
      this.characteristics.accessories,
      this.characteristics.base,
      this.characteristics.leg,
      this.characteristics.face,
      this.characteristics.faceItem,
      this.characteristics.hair,
      this.characteristics.pants,
      this.characteristics.shirt,
      this.characteristics.skin,
      this.characteristics.hatColor,
    ] = values;
  
    this.requestUpdate();
  }

  _generateSeed() {
    const { accessories, base, leg, face, faceItem, hair, pants, shirt, skin, hatColor } = this.characteristics;
    this.characteristics.seed = `${accessories}${base}${leg}${face}${faceItem}${hair}${pants}${shirt}${skin}${hatColor}`;
  }

  _updateSetting(key, value) {
    this.characteristics = { ...this.characteristics, [key]: value };
    this._generateSeed();
    this.requestUpdate();
  }

  _generateLink() {
    const baseUrl = window.location.href.split("?")[0];
    const params = new URLSearchParams({ seed: this.characteristics.seed }).toString();
    const shareLink = `${baseUrl}?${params}`;
  
    navigator.clipboard.writeText(shareLink).then(
      () => this._showNotification("Link copied!"),
      (err) => this._showNotification(`Error: ${err}`)
    );
  }

  _showNotification(message) {
    const notification = this.shadowRoot.getElementById("notification");
    notification.textContent = message;
    notification.classList.add("show");

    setTimeout(() => {
      notification.classList.remove("show");
    }, 2000);
  }

  connectedCallback() {
    super.connectedCallback();
    const params = new URLSearchParams(window.location.search);

    if (params.has("seed")) {
      this.characteristics.seed = params.get("seed");
      this._applySeed();
    }
    this.requestUpdate();
  }

  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(RpgMe.tag, RpgMe);