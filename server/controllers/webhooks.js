import pkg from "svix";
const { Webhook } = pkg;

import User from '../models/User.js'
import Stripe from "stripe";
import { request } from "express";

//API contoller Function to manage Clerk User with databse

export const clerkWebhooks = async (req, res)=>{
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)
        // This line is the security check.
        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]

        })

        const {data, type} = req.body

        switch (type) {
            case 'user.created': {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    imageUrl: data.image_url,
                }
                await User.create(userData)
                res.json({})
                
                break;
            }

            case 'user.updated' : {
                const userData = {
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    imageUrl: data.image_url,
                }
                await User.findByIdAndUpdate(data.id,userData)
                res.json({})
                break;
            }

            case 'user.deleted' : {
                await User.findByIdAndDelete(data.id)
                res.json({})
                break;
            }

            default:
                break;
        }

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}



//Stripe webhooks

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY)

export const stripeWebhooks = async(req, res) =>{
    const sig = req.headers['stripe-signature']
    let event;
    try {
        event = Stripe.wwebhooks.constructEvent(request.body, sig, process.env.STRIPE_WEBKOOK_SECRET);
    } catch (error) {
        res.json(400).send(`Webhook Error: ${error.message}`)
    }
}