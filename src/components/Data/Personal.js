import React from 'react'

export const IndividualData = ({individualExcelData}) => {
    return (
        <>
            <th>{individualExcelData.BibNumber}</th>
            <th>{individualExcelData.AgeGroup}</th>
            <th>{individualExcelData.FullName}</th>
            <th>{individualExcelData.Gender}</th>
            <th>{individualExcelData.Event}</th>
            {/* <th>{individualExcelData.Age}</th>
            <th>{individualExcelData.Date}</th> */}
        </>
    )
}