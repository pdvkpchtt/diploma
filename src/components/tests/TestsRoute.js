"use client";

import LlamaAI from "llamaai";

const apiToken =
  "LL-vyczsgT2XPanXRF6UF8OPx3wWMWcJ9L9bbEJ7IDxCOmGieRiIJcoPuqvOCYOjKbu";
const llamaAPI = new LlamaAI(apiToken);

const TestsRoute = async () => {
  const apiRequestJson = {
    messages: [
      {
        role: "user",
        content: `generate a test in JSON format for knowledge of the basics of the oil and gas industry of the level of complexity average in json format. Questions and answers should be in Russian. the data should be in the form [{"question": "Вопрос", "answers": [{"answer": "Вопрос 1", "rightAnswer": false}, {"answer": "Вопрос 2", "rightAnswer": true]}]`,
      },
    ],

    stream: false,
  };

  const handle = async () => {
    // Execute the Request
    llamaAPI
      .run(apiRequestJson)
      .then((response) => {
        const content = response?.choices[0]?.message?.content;
        console.log(content);
        console.log(
          JSON.parse(
            content
              ?.slice(content?.indexOf("["), content?.lastIndexOf("]") + 1)
              .replace(/'/gi, '"')
          )
        );
      })
      .catch((error) => {
        console.log(error);
        // Handle errors
      });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-12">
      <button onClick={handle}>sdadsa</button>
    </main>
  );
};

export default TestsRoute;
