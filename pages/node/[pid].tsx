import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useSensors } from '../../hooks/useSensors'
import { Log } from '../../types/Log'
import GraphBox from '../../components/GraphBox'
import { useNode } from '../../hooks/useNode'
import GraphBoxBox from '../../components/GraphBoxBox'

export interface Logs {
    id: number[]
    logged_at: Date[]
    hash: string[]
    battery_voltage: number[]
    clockBattery_voltage: number[]
    temperature_celsius: number[]
    nitrate_mg_P_L: number[]
    nitrate_mV: number[]
    speciicConductivity_mS_P_cm: number[]
    salinity_psu: number[]
    totalDissolvedSolids_g_P_L: number[]
    rawCoductivity_uS_P_cm: number[]
    pH_units: number[]
    pH_mV: number[]
    referece_mV: number[]
}

const format = (data: Log[]): Logs => {
    return {
        id: data.map(d => d.id),
        logged_at: data.map(d => d.logged_at),
        hash: data.map(d => d.hash),
        battery_voltage: data.map(d => d.battery_voltage),
        clockBattery_voltage: data.map(d => d.clockBattery_voltage),
        temperature_celsius: data.map(d => d.temperature_celsius),
        nitrate_mg_P_L: data.map(d => d.nitrate_mg_P_L),
        nitrate_mV: data.map(d => d.nitrate_mV),
        speciicConductivity_mS_P_cm: data.map(d => d.speciicConductivity_mS_P_cm),
        salinity_psu: data.map(d => d.salinity_psu),
        totalDissolvedSolids_g_P_L: data.map(d => d.totalDissolvedSolids_g_P_L),
        rawCoductivity_uS_P_cm: data.map(d => d.rawCoductivity_uS_P_cm),
        pH_units: data.map(d => d.pH_units),
        pH_mV: data.map(d => d.pH_mV),
        referece_mV: data.map(d => d.referece_mV),
    }
}

const Node: NextPage = () => {
    const router = useRouter()
    const { pid } = router.query
    const { logs, isLoading, isError } = useSensors(pid as string)
    const { node } = useNode(pid as string)

    if (isError) return <div>Failed to load data {pid}</div >
    if (isLoading) return <div>Loading...</div>

    const formattedLogs = format(logs)

    return (
        <div className="grid grid-cols-4 gap-4 mb-3 bg-gray-100" >
            <GraphBox node={node} data={formattedLogs.logged_at.map((e, i) => [e, formattedLogs.battery_voltage[i]])} details={{ title: "battery_voltage", data_type: "V" }} ></GraphBox>
            <GraphBox node={node} data={formattedLogs.logged_at.map((e, i) => [e, formattedLogs.clockBattery_voltage[i]])} details={{ title: "clockBattery_voltage", data_type: "V" }} ></GraphBox>
            <GraphBox node={node} data={formattedLogs.logged_at.map((e, i) => [e, formattedLogs.temperature_celsius[i]])} details={{ title: "temperature_celsius", data_type: "C" }} ></GraphBox>
            <GraphBox node={node} data={formattedLogs.logged_at.map((e, i) => [e, formattedLogs.nitrate_mg_P_L[i]])} details={{ title: "nitrate_mg_P_L", data_type: "mg/L" }} ></GraphBox>
            <GraphBox node={node} data={formattedLogs.logged_at.map((e, i) => [e, formattedLogs.nitrate_mV[i]])} details={{ title: "nitrate_mV", data_type: "mV" }} ></GraphBox>
            <GraphBox node={node} data={formattedLogs.logged_at.map((e, i) => [e, formattedLogs.speciicConductivity_mS_P_cm[i]])} details={{ title: "speciicConductivity_mS_P_cm", data_type: "mS/cm" }} ></GraphBox>
            <GraphBox node={node} data={formattedLogs.logged_at.map((e, i) => [e, formattedLogs.salinity_psu[i]])} details={{ title: "salinity_psu", data_type: "psu" }} ></GraphBox>
            <GraphBox node={node} data={formattedLogs.logged_at.map((e, i) => [e, formattedLogs.totalDissolvedSolids_g_P_L[i]])} details={{ title: "totalDissolvedSolids_g_P_L", data_type: "g/L" }} ></GraphBox>
            <GraphBox node={node} data={formattedLogs.logged_at.map((e, i) => [e, formattedLogs.rawCoductivity_uS_P_cm[i]])} details={{ title: "rawCoductivity_uS_P_cm", data_type: "uS/cm" }} ></GraphBox>
            <GraphBox node={node} data={formattedLogs.logged_at.map((e, i) => [e, formattedLogs.pH_units[i]])} details={{ title: "pH_units", data_type: "pH" }} ></GraphBox>
            <GraphBox node={node} data={formattedLogs.logged_at.map((e, i) => [e, formattedLogs.pH_mV[i]])} details={{ title: "pH_mV", data_type: "mV" }} ></GraphBox>
            <GraphBox node={node} data={formattedLogs.logged_at.map((e, i) => [e, formattedLogs.referece_mV[i]])} details={{ title: "referece_mV", data_type: "mV" }} ></GraphBox>
        </div >
    )
}

export default Node