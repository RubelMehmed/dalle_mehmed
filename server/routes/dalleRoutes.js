import * as dotenv from 'dotenv';
import express from 'express';
import { Configuration, OpenAIApi } from 'openai';


dotenv.config();

//____________initialize router

const router = express.Router();

const configuration = new Configuration({
    apikey: process.env.OPENAI_API_KEY,
})

//__________the real call for prompt  and img

router.route('/').post(async (req, res) => {
    try {
        const { prompt } =req.body;

        const aiResponse = await openai.createImage({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json',
        })
        
        //_____instance for image from response above

        const image = aiResponse.data.data[0].b64_json;

        //______send image to client

        res.status(200).json({ image });

    } catch (error) {
        console.log(error);
        res.status(500).send(error?.response.data.error.message)
    }
});

//__________ create instance for api

const openai = new OpenAIApi(configuration);

//___________let's connect api with route to send res


router.route('/').get((req, res) => {
    res.send('Hello from DALL-E!')
})

export default router;