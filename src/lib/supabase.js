import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fvrmcoukkczweuneyovf.supabase.co'

const supabaseKey = 'sb_publishable_bZL-upuSb3I35MVMTciL9w_HolwKJQt'

export const supabase = createClient(supabaseUrl, supabaseKey)
