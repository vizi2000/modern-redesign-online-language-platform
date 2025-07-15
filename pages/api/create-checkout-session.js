import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).end('Method Not Allowed')
  }

  try {
    const { packageId, amount, description } = req.body

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'blik', 'p24'],
      currency: 'pln',
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'pln',
            product_data: {
              name: description,
              description: `Pakiet lekcji - ${description}`
            },
            unit_amount: amount
          },
          quantity: 1
        }
      ],
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      metadata: {
        packageId: packageId
      }
    })

    res.status(200).json({ sessionId: session.id })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
