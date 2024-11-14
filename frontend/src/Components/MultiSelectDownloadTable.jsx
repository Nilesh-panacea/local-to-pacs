import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import axios from 'axios';

const MultiSelectTable = ({ data, columns }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log('Selected Rows:', JSON.stringify(selectedRows));
    const ws = new WebSocket("ws://127.0.0.1:8000/ws");
    setSocket(ws);
    ws.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    ws.onmessage = (event) => {
      console.log(event.data);
      setMessage(event.data);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [selectedRows]);

  const handleSelectRow = (item) => {
    setSelectedRows((prev) => {
      if (prev.includes(item)) {
        return prev.filter((row) => row !== item);
      } else {
        return [...prev, item];
      }
    });
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(data);
    } else {
      setSelectedRows([]);
    }
  };

  const handleSubmit = () => {
    if (socket) {
        socket.send(JSON.stringify(selectedRows));
    }
  };

  return (
    <div>
      <table border="1">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={selectedRows.length === data.length}
              />
            </th>
            {columns.map((col, index) => (
              <th key={index}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(item)}
                  onChange={() => handleSelectRow(item)}
                />
              </td>
              {columns.map((col, colIndex) => (
                <td key={colIndex}>{item[col.accessor]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: '10px' }}>
        <CSVLink data={selectedRows} filename="selected-data.csv">
          <button disabled={selectedRows.length === 0}>Download Selected</button>
        </CSVLink>
        <button
          style={{ marginLeft: '10px' }}
          onClick={handleSubmit}
          disabled={selectedRows.length === 0}
        >
          Submit Selected
        </button>
        <p>Message from Server: {message}</p>
      </div>
    </div>
  );
};

export default MultiSelectTable;
