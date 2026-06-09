import { QRCodeSVG } from "qrcode.react";

const BASE_URL = "http://localhost:5173";
const TABLES = [1, 2, 3, 4, 5, 6];

export default function QRPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      {/* Page title */}
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-3xl font-bold text-gray-900">🍽️ Casa Bella</h1>
        <p className="text-gray-500 mt-2">
          Print and place each QR code on the matching table
        </p>
      </div>

      {/* QR grid — one per table */}
      <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-6">
        {TABLES.map((table) => {
          const url = `${BASE_URL}/?table=${table}`;
          return (
            <div
              key={table}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center gap-4"
            >
              {/* QR Code */}
              <QRCodeSVG
                value={url}
                size={160}
                bgColor="#ffffff"
                fgColor="#1a1a1a"
                level="H"
              />

              {/* Table label */}
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">
                  Table {table}
                </p>
                <p className="text-xs text-gray-400 mt-1 break-all">{url}</p>
              </div>

              {/* Print button */}
              <button
                onClick={() => window.print()}
                className="text-sm text-orange-500 hover:text-orange-600 font-medium transition-colors"
              >
                🖨️ Print
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
