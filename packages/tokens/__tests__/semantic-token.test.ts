import { describe, expect, test } from 'vitest'
import { TokenMap } from '../src/token-map'

describe('semantic tokens / basic', () => {
  test('with reference', () => {
    const dict = new TokenMap({
      tokens: {
        colors: {
          blue: { value: '#000' },
        },
      },
      semanticTokens: {
        colors: {
          brand: {
            value: { base: 'blue', dark: '#555' },
          },
        },
      },
    })

    expect(dict.categoryMap).toMatchInlineSnapshot(`
      Map {
        "colors" => Map {
          "blue" => {
            "category": "colors",
            "condition": "",
            "description": "",
            "key": "blue",
            "negative": false,
            "prop": "colors.blue",
            "value": "#000",
            "var": "--colors-blue",
            "varRef": "var(--colors-blue)",
          },
          "brand" => {
            "category": "colors",
            "condition": "base",
            "description": "",
            "key": "brand",
            "negative": false,
            "prop": "colors.brand",
            "value": "var(--colors-blue)",
            "var": "--colors-brand",
            "varRef": "var(--colors-brand)",
          },
        },
      }
    `)

    expect(dict.conditionValues).toMatchInlineSnapshot(`
      Map {
        "base" => Map {
          "colors.brand" => {
            "category": "colors",
            "condition": "base",
            "description": "",
            "key": "brand",
            "negative": false,
            "prop": "colors.brand",
            "value": "var(--colors-blue)",
            "var": "--colors-brand",
            "varRef": "var(--colors-brand)",
          },
        },
        "dark" => Map {
          "colors.brand" => {
            "category": "colors",
            "condition": "dark",
            "description": "",
            "key": "brand",
            "negative": false,
            "prop": "colors.brand",
            "value": "#555",
            "var": "--colors-brand",
            "varRef": "var(--colors-brand)",
          },
        },
      }
    `)

    expect(dict.vars).toMatchInlineSnapshot(`
      Map {
        "--colors-blue" => "#000",
        "--colors-brand" => "var(--colors-blue)",
      }
    `)

    expect(dict.conditionVars).toMatchInlineSnapshot(`
      Map {
        "dark" => Map {
          "--colors-brand" => "#555",
        },
      }
    `)
  })

  test('with raw string', () => {
    const dict = new TokenMap({
      tokens: {
        colors: {
          blue: { value: '#000' },
        },
      },
      semanticTokens: {
        colors: {
          brand: {
            value: '#898',
          },
        },
      },
    })

    expect(dict.conditionValues).toMatchInlineSnapshot(`
      Map {
        "base" => Map {
          "colors.brand" => {
            "category": "colors",
            "condition": "base",
            "description": "",
            "key": "brand",
            "negative": false,
            "prop": "colors.brand",
            "value": "#898",
            "var": "--colors-brand",
            "varRef": "var(--colors-brand)",
          },
        },
      }
    `)

    expect(dict.conditionVars).toMatchInlineSnapshot('Map {}')
  })
})

describe('semantic tokens / composite', () => {
  test('shadow', () => {
    const dict = new TokenMap({
      semanticTokens: {
        shadows: {
          md: { value: { x: 0, y: 4, blur: 6, spread: 1, color: 'rgba(0,0,0,0)' } },
        },
        fonts: {
          body: { value: ["'Inter'", 'sans-serif'] },
          mono: { value: { base: ["'Fira Code'", 'monospace'], ltr: ['RTL Mono'] } },
        },
      },
    })

    expect(dict.conditionVars).toMatchInlineSnapshot(`
      Map {
        "ltr" => Map {
          "--fonts-mono" => "RTL Mono",
        },
      }
    `)

    expect(dict.conditionValues).toMatchInlineSnapshot(`
      Map {
        "base" => Map {
          "shadows.md" => {
            "category": "shadows",
            "condition": "base",
            "description": "",
            "key": "md",
            "negative": false,
            "prop": "shadows.md",
            "value": "0px 4px 6px 1px rgba(0,0,0,0)",
            "var": "--shadows-md",
            "varRef": "var(--shadows-md)",
          },
          "fonts.body" => {
            "category": "fonts",
            "condition": "base",
            "description": "",
            "key": "body",
            "negative": false,
            "prop": "fonts.body",
            "value": "'Inter', sans-serif",
            "var": "--fonts-body",
            "varRef": "var(--fonts-body)",
          },
          "fonts.mono" => {
            "category": "fonts",
            "condition": "base",
            "description": "",
            "key": "mono",
            "negative": false,
            "prop": "fonts.mono",
            "value": "'Fira Code', monospace",
            "var": "--fonts-mono",
            "varRef": "var(--fonts-mono)",
          },
        },
        "ltr" => Map {
          "fonts.mono" => {
            "category": "fonts",
            "condition": "ltr",
            "description": "",
            "key": "mono",
            "negative": false,
            "prop": "fonts.mono",
            "value": "RTL Mono",
            "var": "--fonts-mono",
            "varRef": "var(--fonts-mono)",
          },
        },
      }
    `)
  })
})