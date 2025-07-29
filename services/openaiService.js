require('dotenv').config();
const axios = require('axios');

// async function generateTestCode(bodyText) {
//   console.log("callOpenAI");
//   console.log(process.env.API_KEY);
//   console.log(process.env.OPENAI_URL);

//   const url = process.env.OPENAI_URL;

//   const headers = {
//     'accept': 'application/json',
//     'x-api-key': process.env.API_KEY,
//     'Content-Type': 'application/json'
//   };

//   const data = {
//     user: process.env.USER,
//     messages: [
//       {
//         role: 'user',
//         content: bodyText
//       }
//     ]
//   };

//   console.log("Invoking OpenAI---");

//   const retries = 3;
//   for (let attempt = 0; attempt < retries; attempt++) {
//     try {
//       const response = await axios.post(url, data, { headers });
//       const respText = response.data?.choices?.[0]?.message?.content || '';

//       console.log("OpenAI Response choices is:", respText);
//       return respText;

//     } catch (error) {
//       console.error(`OpenAI API error: ${error.message} (attempt ${attempt + 1})`);
//       await new Promise(resolve => setTimeout(resolve, 2000));
//     }
//   }

//   return null;
// }


// module.exports = { generateTestCode };


const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function generateTestCode(prompt) {
    const systemPrompt = "You are a QA automation engineer. Generate Playwright test.";


    const url = process.env.OPENAI_URL;

    const headers = {
        'accept': 'application/json',
        'x-api-key': process.env.API_KEY,
        'Content-Type': 'application/json'
    };

    // const data = {
    //     user: process.env.USER,
    //     messages: [
    //         { role: 'system', content: systemPrompt },
    //         { role: 'user', content: prompt }
    //     ]
    // };
    const response = await openai.chat.completions.create({
        model: 'gpt-4',
        url: url,
        headers: headers,
        user: process.env.USER,
        messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: prompt }
        ],
        temperature: 0.3
    });
    return response.choices[0].message.content;
}

module.exports = { generateTestCode };




// const OpenAI = require('openai');
// const openai = new OpenAI({ apiKey: 'sk-rBeANxMmQeq7oDqwi8j_9g' });

// async function generateTestCode(prompt) {

//     const systemPrompt = `
//     You are a Playwright test generator.
//     You are given a scenario or a website URL and must generate a Playwright TypeScript test.
//     When provided with a website URL, follow these steps strictly:
//     Navigate to the http://localhost:5173/ URL using Playwright.
//     Explore one key functionality of the site.
//     Document your exploration, including:
//     Elements located (selectors)
//     User interactions performed (clicks, typing, navigation, etc.)
//     Expected behaviors or page changes
//     Formulate one meaningful test scenario based on your exploration.
//     Implement a Playwright test in TypeScript using @playwright/test.`;

//     const url = process.env.OPENAI_URL;

//     const headers = {
//         'accept': 'application/json',
//         'x-api-key': process.env.API_KEY,
//         'Content-Type': 'application/json'
//     };

//     const data = {
//         user: process.env.USER,
//         messages: [
//             {
//                 role: 'user',
//                 content: systemPrompt
//             }
//         ]
//     };




//     const response = await openai.chat.completions.create({
//         model: 'gpt-4o',
//         messages: [
//             { role: 'system', content: systemPrompt },
//             { role: 'user', content: prompt }
//         ],
//         temperature: 0.3
//     });
//     return response.choices[0].message.content;
// }

// module.exports = { generateTestCode };



