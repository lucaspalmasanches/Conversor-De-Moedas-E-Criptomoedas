const SETTINGS = {
    EXCHANGE_RATE_API_KEY: "process.env",
    EXCHANGE_RATE_API_BASE_URL: "https://v6.exchangerate-api.com/v6/",
    BINANCE_API_BASE_URL: "https://api.binance.com/api/v3/",
    COMMON_BASE_CURRENCY: "USD"
}

const convertButton = document.querySelector(".convert-button")
const currencySelectFrom = document.querySelector(".currency-select-from")
const currencySelectTo = document.querySelector(".currency-select-to")
const inputCurrencyValue = document.querySelector(".input-currency")
const currencyValueToConvert = document.querySelector(".currency-value-to-convert")
const currencyValueConverted = document.querySelector(".currency-value")
const currencyNameFrom = document.querySelector(".currency-name-from")
const currencyImgFrom = document.querySelector(".currency-img-from")
const currencyNameTo = document.querySelector(".currency-name-to")
const currencyImgTo = document.querySelector(".currency-img-to")

let currentExchangeRates = null
let currentCryptoRates = null

const CURRENCY_MAP = {
    "real": { code: "BRL", name: "Real", locale: "pt-BR", img: "./assets/real.png", isCrypto: false, symbol: "R$" },
    "dolar": { code: "USD", name: "Dólar Americano", locale: "en-US", img: "./assets/dolar.png", isCrypto: false, symbol: "$" },
    "euro": { code: "EUR", name: "Euro", locale: "de-DE", img: "./assets/euro.png", isCrypto: false, symbol: "€" },
    "libra": { code: "GBP", name: "Libra", locale: "en-GB", img: "./assets/libra.png", isCrypto: false, symbol: "£" },
    "yen": { code: "JPY", name: "Yen", locale: "ja-JP", img: "./assets/yen.png", isCrypto: false, symbol: "¥" },
    "bitcoin": { code: "BTC", name: "Bitcoin", locale: "en-US", img: "./assets/bitcoin.png", isCrypto: true, symbol: "₿" }
}

async function buscarCotacoesCrypto(symbol = "BTCBRL") {
    const url = `${SETTINGS.BINANCE_API_BASE_URL}ticker/price?symbol=${symbol}`

    try {
        const resposta = await fetch(url)
        if (!resposta.ok) {
            throw new Error(`Erro HTTP ao buscar cripto! Status: ${resposta.status}`)
        }
        const dados = await resposta.json()
        if (dados && dados.price) {
            const price = parseFloat(dados.price)
            console.log(`Cotação de ${symbol} na Binance:`)
            return price
        } else {
            throw new Error(`Dados de ${symbol} não encontrados na API da Binance`)
        }
    } catch (erro) {
        console.error("Não foi possível buscar cotações de cripto:", erro)
        return null
    }
}

async function buscarCotacoesMoeda(moedaBase = SETTINGS.COMMON_BASE_CURRENCY) {
    const url = `${SETTINGS.EXCHANGE_RATE_API_BASE_URL}${SETTINGS.EXCHANGE_RATE_API_KEY}/latest/${moedaBase}`

    try {
        const resposta = await fetch(url)
        if (!resposta.ok) {
            throw new Error(`Erro HTTP! Status: ${resposta.status}`)
        }

        const dados = await resposta.json()

        if (dados.result === "error") {
            throw new Error(`Erro da API para ${moedaBase}: ${dados["error-type"]}`)
        }

        return dados.conversion_rates
    } catch (erro) {
        console.error("Não foi possível buscar cotações:", erro)
        return null
    }
}

function formatCurrency(value, locale, currencyCode) {
    const options = {
        style: "currency",
        currency: currencyCode,
        minimumFractionalDigits: 2,
        maximumFractionalDigits: (currencyCode === "BTC" ? 8 : 2)
    }

    let formattedValue = new Intl.NumberFormat(locale, options).format(value)

    if (currencyCode === "BTC") {
        formattedValue = formattedValue.replace("BTC", "₿")
    }
    return formattedValue
}

function populateCurrencySelects() {
    const currencies = Object.keys(CURRENCY_MAP)

    currencySelectFrom.innerHTML = ""
    currencySelectTo.innerHTML = ""

    currencies.forEach(currencyKey => {
        const currencyInfo = CURRENCY_MAP[currencyKey]
        const optionFrom = document.createElement("option")
        optionFrom.value = currencyKey
        optionFrom.textContent = `${currencyInfo.symbol} - ${currencyInfo.name}`
        currencySelectFrom.appendChild(optionFrom)

        const optionTo = document.createElement("option")
        optionTo.value = currencyKey
        optionTo.textContent = `${currencyInfo.symbol} - ${currencyInfo.name}`
        currencySelectTo.appendChild(optionTo)
    })

    currencySelectFrom.value = "real"
    currencySelectTo.value = "dolar"
}

function updateCurrencyDisplay() {
    const selectedCurrencyFromKey = currencySelectFrom.value
    const selectedCurrencyToKey = currencySelectTo.value

    const fromInfo = CURRENCY_MAP[selectedCurrencyFromKey]
    const toInfo = CURRENCY_MAP[selectedCurrencyToKey]

    if (fromInfo) {
        currencyNameFrom.innerHTML = fromInfo.name
        currencyImgFrom.src = fromInfo.img
        inputCurrencyValue.placeholder = formatCurrency(0, fromInfo.locale, fromInfo.code)
    }
    if (toInfo) {
        currencyNameTo.innerHTML = toInfo.name
        currencyImgTo.src = toInfo.img
    }
}

let currentBitcoinRateInBRL

async function convertValues() {
    const rawInputValue = inputCurrencyValue.value
    const selectedCurrencyFromKey = currencySelectFrom.value
    const selectedCurrencyToKey = currencySelectTo.value

    const fromInfo = CURRENCY_MAP[selectedCurrencyFromKey]
    const toInfo = CURRENCY_MAP[selectedCurrencyToKey]

    if (fromInfo.code === toInfo.code) {
        const inputValue = parseFloat(rawInputValue)
        if (isNaN(inputValue) || inputValue < 0) {
            currencyValueToConvert.innerHTML = formatCurrency(0, fromInfo.locale, fromInfo.code)
            currencyValueConverted.innerHTML = "Valor inválido."
        } else {
            currencyValueToConvert.innerHTML = formatCurrency(inputValue, fromInfo.locale, fromInfo.code)
            currencyValueConverted.innerHTML = formatCurrency(inputValue, toInfo.locale, toInfo.code)
        }
        return
    }

    if (rawInputValue.trim() === "") {
        currencyValueToConvert.innerHTML = formatCurrency(0, fromInfo.locale, fromInfo.code)
        currencyValueConverted.innerHTML = formatCurrency(0, toInfo.locale, toInfo.code)
        return
    }

    const inputValue = parseFloat(rawInputValue)

    if (isNaN(inputValue)) {
        currencyValueToConvert.innerHTML = formatCurrency(0, fromInfo.locale, fromInfo.code)
        currencyValueConverted.innerHTML = "Por favor, insira um número válido."
        return
    }

    if (inputValue < 0) {
        currencyValueToConvert.innerHTML = formatCurrency(0, fromInfo.locale, fromInfo.code)
        currencyValueConverted.innerHTML = "Por favor, insira um valor maior ou igual a zero."
        return
    }

    const needsFiatAPI = (fromInfo.code !== SETTINGS.COMMON_BASE_CURRENCY && !fromInfo.isCrypto) ||
        (toInfo.code !== SETTINGS.COMMON_BASE_CURRENCY && !toInfo.isCrypto) ||
        (fromInfo.isCrypto && (fromInfo.code === "BTC" && !currentExchangeRates?.BRL)) ||
        (toInfo.isCrypto && (toInfo.code === "BTC" && !currentExchangeRates?.BRL))

    if (needsFiatAPI && !currentExchangeRates) {
        console.log(`Buscando cotações fiat com ${SETTINGS.COMMON_BASE_CURRENCY} como base...`)
        currentExchangeRates = await buscarCotacoesMoeda(SETTINGS.COMMON_BASE_CURRENCY)
    }

    if (needsFiatAPI && !currentExchangeRates) {
        console.error("Erro: Não foi possível obter as taxas de moedas fiduciárias.")
        currencyValueConverted.innerHTML = "Erro: Não foi possível carregar as taxas de moedas fiduciárias. Verifique sua chave API."
        return
    }

    const needsCryptoAPI = fromInfo.isCrypto || toInfo.isCrypto

    if (needsCryptoAPI && !currentBitcoinRateInBRL) {
        console.log("Buscando cotação de Bitcoin em BRL...")
        currentBitcoinRateInBRL = await buscarCotacoesCrypto("BTCBRL")
    }

    if (needsCryptoAPI && !currentBitcoinRateInBRL) {
        console.error("Erro: Não foi possível carregar a cotação do Bitcoin.")
        currencyValueConverted.innerHTML = "Erro: Não foi possível carregar a cotação do Bitcoin. Tente novamente mais tarde."
        return
    }

    currencyValueToConvert.innerHTML = formatCurrency(inputValue, fromInfo.locale, fromInfo.code)

    let valueInUSD = 0

    if (fromInfo.code === SETTINGS.COMMON_BASE_CURRENCY) {
        valueInUSD = inputValue
    } else if (fromInfo.isCrypto) {
        if (!currentBitcoinRateInBRL) {
            console.error("Erro: Cotação de Bitcoin indisponível para conversão.")
            currencyValueConverted.innerHTML = "Erro: Cotação de Bitcoin indisponível."
            return
        }
        if (!currentExchangeRates?.BRL) {
            console.error(`Erro: Taxa ${CURRENCY_MAP.real.symbol}-${SETTINGS.COMMON_BASE_CURRENCY} indisponível (necessária para Bitcoin).`)
            currencyValueConverted.innerHTML = `Erro: Taxa ${CURRENCY_MAP.real.symbol}-${SETTINGS.COMMON_BASE_CURRENCY} indisponível.`
            return
        }

        const valueInBRL = inputValue * currentBitcoinRateInBRL
        valueInUSD = valueInBRL / currentExchangeRates.BRL

    } else {
        if (!currentExchangeRates?.[fromInfo.code]) {
            console.error(`Erro: Taxa de ${fromInfo.name} (${fromInfo.symbol}) para ${SETTINGS.COMMON_BASE_CURRENCY} indisponível.`)
            currencyValueConverted.innerHTML = `Erro: Taxa ${fromInfo.symbol}-${SETTINGS.COMMON_BASE_CURRENCY} indisponível.`
            return
        }
        valueInUSD = inputValue / currentExchangeRates[fromInfo.code]
    }

    let convertedValue = 0

    if (toInfo.code === SETTINGS.COMMON_BASE_CURRENCY) {
        convertedValue = valueInUSD
    } else if (toInfo.isCrypto) {
        if (!currentBitcoinRateInBRL) {
            console.error("Erro: Cotação de Bitcoin indisponível para conversão.")
            currencyValueConverted.innerHTML = "Erro: Cotação de Bitcoin indisponível."
            return
        }

        if (!currentExchangeRates?.BRL) {
            console.error(`Erro: Taxa ${CURRENCY_MAP.real.symbol}-${SETTINGS.COMMON_BASE_CURRENCY} indisponível (necessária para Bitcoin).`)
            currencyValueConverted.innerHTML = `Erro: Taxa ${CURRENCY_MAP.real.symbol}-${SETTINGS.COMMON_BASE_CURRENCY} indisponível.`
            return
        }

        const valueInBRL = valueInUSD * currentExchangeRates.BRL
        convertedValue = valueInBRL / currentBitcoinRateInBRL

    } else {
        if (!currentExchangeRates?.[toInfo.code]) {
            console.error(`Erro: Taxa de ${toInfo.name} (${toInfo.symbol}) para ${SETTINGS.COMMON_BASE_CURRENCY} indisponível.`)
            currencyValueConverted.innerHTML = `Erro: Taxa ${toInfo.symbol}-${SETTINGS.COMMON_BASE_CURRENCY} indisponível.`
            return
        }
        convertedValue = valueInUSD * currentExchangeRates[toInfo.code]
    }

    currencyValueConverted.innerHTML = formatCurrency(convertedValue, toInfo.locale, toInfo.code)
}

function changeCurrency() {
    updateCurrencyDisplay()
    convertValues()
}

currencySelectFrom.addEventListener("change", changeCurrency)
currencySelectTo.addEventListener("change", changeCurrency)

convertButton.addEventListener("click", convertValues)

document.addEventListener("DOMContentLoaded", async () => {
    populateCurrencySelects()
    updateCurrencyDisplay()

    await convertValues()
})