export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">
          🐼 Panda Dojo
        </h1>
        <p className="text-2xl text-gray-600 mb-8">
          Sistema de Gestão para Academias de Artes Marciais
        </p>
        <div className="bg-gradient-to-r from-blue-500 to-orange-500 text-white p-8 rounded-lg shadow-lg">
          <p className="text-xl">Em desenvolvimento...</p>
          <p className="mt-2">Sistema multitenant com IA, eventos, pagamentos e muito mais!</p>
        </div>
      </div>
    </main>
  )
}
