import express from 'express'
import * as dotenv from 'dotenv'
import Replicate from "replicate";

dotenv.config();

const router = express.Router();

const replicate = new Replicate({
  auth: process.env.API_KEY,
});

router.get('/', (req,res) => {
    res.send('Hello dalle')
})

router.post('/', async (req, res) => {
    const {prompt} = req.body;
    console.log("Running the model...");
    const output = await replicate.run(
      "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
      {
        input: {
          prompt: prompt,
          num_outputs: 1,
        }
      }
    );
    console.log(output);
    
    res.status(200).json({photo: output[0]});
});

export default router;