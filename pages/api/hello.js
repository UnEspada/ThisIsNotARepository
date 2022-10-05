// Estos imports solo son para ayudar el autocompletado.
// Originalmente estos si son necesarios para usar TypeScript.
import { NextApiRequest, NextApiResponse } from "next";

/**
 *
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
export default async (req, res) => {
  console.log("received: ", JSON.stringify(req.body));

  res.send({
    message: `API Received: "${JSON.stringify(req.body)}", check your console!`,
    data: req.body,
  });
};
