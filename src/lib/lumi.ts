
import { createClient } from '@lumi.new/sdk'

export const lumi = createClient({
  projectId: 'p354701818687631360',
  apiBaseUrl: 'https://api.lumi.new',
  authOrigin: 'https://auth.lumi.new',
})

export const lumiStaging = createClient({
  projectId: 'p354701818687631360',
  apiBaseUrl: 'https://api.staging.lumi.new',
  authOrigin: 'https://auth.staging.lumi.new',
})