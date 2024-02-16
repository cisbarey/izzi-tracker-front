import React, { useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from "primereact/column";

const IpListComponent = ({
    loading,
    data,
    totalRecords,
    totalPages
}) => {

    const [first, setFirst] = useState(1);
    const [rows, setRows] = useState(12);

    const bodyTempate = (rowData) => {
        return (
            <div>
                <a href={`https://www.google.com/maps/search/?api=1&query=${rowData.lat},${rowData.lon}`} target="_blank" rel="noopener noreferrer">Map</a>
            </div>
        )
    }

    return (
        <DataTable
            value={data}
            lazy
            first={first}
            dataKey="id"
            paginator
            rows={rows}
            totalPages={totalPages}
            totalRecords={totalRecords}
            loading={loading}
            onPage={(e) => {
                setFirst(e.first);
                setRows(e.rows);
            }}
        >
            <Column field="ip" header="IP"></Column>
            <Column field="country" header="Country"></Column>
            <Column field="regionName" header="Region Name"></Column>
            <Column field="city" header="City"></Column>
            <Column body={bodyTempate} header="City"></Column>
        </DataTable>
    )
}

export default IpListComponent;