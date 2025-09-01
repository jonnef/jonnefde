import React from 'react'

const translate = async (value: string) => {

    const url = 'https://api-free.deepl.com/v2/translate';

    const urlencoded = new URLSearchParams();
    urlencoded.append("text", value)
    urlencoded.append("target_lang", "DE")

    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'DeepL-Auth-Key 517fcc89-5455-4fec-8336-722eda1dc819:fx'
          },
        body: urlencoded.toString(),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

        const data = await response.json();
        return data.translations?.[0]?.text ?? null;
}

export default translate
