export type BAAnalysis = {
  stageOfAwareness?: string
  sophistication?: number
  massDesire?: string
  usp?: string
  angles?: string[]
  objections?: string[]
  riskReversals?: string[]
  score?: number
  rationale?: string
}

export async function analyzeWithOpenAI(input: {
  title: string
  description?: string | null
  metrics?: Record<string, any>
  context?: string
}): Promise<BAAnalysis> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) throw new Error('Missing OPENAI_API_KEY')

  const prompt = `You are a product marketing analyst trained on Eugene Schwartz's Breakthrough Advertising.
Identify: stage_of_awareness, sophistication_level (1-5), mass_desire, USP, 5-8 ad_angles, 3-6 objections, 2-4 risk_reversals.
Rate a 0-100 score (fit-to-scale potential) and explain rationale briefly.

Product: ${input.title}
Description: ${input.description ?? ''}
Signals: ${JSON.stringify(input.metrics ?? {})}
`

  // Use Responses API (preferred as of 2025)
  const res = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-5-mini',
      input: prompt,
      temperature: 0.4,
      response_format: { type: 'json_object' }
    })
  })

  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`OpenAI error: ${res.status} ${txt}`)
  }
  const data = await res.json()
  // data.output[0].content[0].text may vary; handle JSON parse defensively
  const text = data?.output?.[0]?.content?.[0]?.text ?? data?.output_text ?? data?.choices?.[0]?.message?.content ?? '{}'
  try {
    return JSON.parse(text)
  } catch {
    return { rationale: String(text) }
  }
}
