export interface Log {
    id: number
    logged_at: Date
    hash: string
    battery_voltage: number
    clockBattery_voltage: number
    temperature_celsius: number
    nitrate_mg_P_L: number
    nitrate_mV: number
    speciicConductivity_mS_P_cm: number
    salinity_psu: number
    totalDissolvedSolids_g_P_L: number
    rawCoductivity_uS_P_cm: number
    pH_units: number
    pH_mV: number
    referece_mV: number
    node_id: string
}