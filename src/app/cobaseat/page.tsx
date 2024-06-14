import SeatSelector from "./SeatSelector";

const CobaSeat = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">
          Pemesanan Kursi Tiket Pesawat
        </h1>
        <SeatSelector />
      </div>
    </div>
  );
};

export default CobaSeat;
