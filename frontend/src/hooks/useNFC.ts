import { useState, useEffect, useCallback } from 'react';
import type { NFCReadData } from '@/types';
import { toast } from 'sonner';

// Tipos para Web NFC API (ainda não está oficialmente no TypeScript)
declare global {
  interface Window {
    NDEFReader?: any;
    NDEFWriter?: any;
  }
}

interface UseNFCReturn {
  isSupported: boolean;
  isReading: boolean;
  isWriting: boolean;
  error: string | null;
  readNFC: () => Promise<NFCReadData | null>;
  writeNFC: (ativoId: string, codigo: string, nome: string) => Promise<boolean>;
  stopReading: () => void;
}

export const useNFC = (): UseNFCReturn => {
  const [isSupported, setIsSupported] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [isWriting, setIsWriting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [abortController, setAbortController] = useState<AbortController | null>(null);

  // Verificar suporte NFC
  useEffect(() => {
    if ('NDEFReader' in window) {
      setIsSupported(true);
    } else {
      setIsSupported(false);
    }
  }, []);

  // Ler tag NFC
  const readNFC = useCallback(async (): Promise<NFCReadData | null> => {
    if (!isSupported) {
      setError('NFC não é suportado neste dispositivo/navegador');
      toast.error('NFC não é suportado neste dispositivo');
      return null;
    }

    try {
      setIsReading(true);
      setError(null);

      const ndef = new window.NDEFReader();
      const controller = new AbortController();
      setAbortController(controller);

      await ndef.scan({ signal: controller.signal });

      toast.info('Aproxime uma etiqueta NFC do dispositivo...');

      return new Promise((resolve, reject) => {
        ndef.addEventListener("reading", ({ message, serialNumber }: any) => {
          console.log('NFC Tag lida:', { message, serialNumber });

          try {
            // Processar dados da tag
            const record = message.records[0];

            if (!record) {
              throw new Error('Tag NFC vazia');
            }

            let nfcData: NFCReadData | null = null;

            // Tentar extrair dados da URL ou JSON
            if (record.recordType === "url") {
              const decoder = new TextDecoder();
              const url = decoder.decode(record.data);

              // Extrair ID do ativo da URL (ex: https://annitrack.app/ativo/ativo-1)
              const match = url.match(/\/ativo\/([^\/]+)/);
              if (match) {
                const id = match[1];
                nfcData = { id, codigo: '', nome: '', url };
              }
            } else if (record.recordType === "mime" && record.mediaType === "application/json") {
              const decoder = new TextDecoder();
              const json = JSON.parse(decoder.decode(record.data));
              nfcData = { ...json, url: '' };
            } else if (record.recordType === "text") {
              const decoder = new TextDecoder();
              const text = decoder.decode(record.data);
              // Pode ser o código de patrimônio direto
              nfcData = { id: text, codigo: text, nome: '', url: '' };
            }

            if (nfcData) {
              toast.success('Tag NFC lida com sucesso!');
              setIsReading(false);
              controller.abort();
              resolve(nfcData);
            } else {
              throw new Error('Formato de tag não reconhecido');
            }
          } catch (err) {
            const errorMsg = err instanceof Error ? err.message : 'Erro ao processar tag NFC';
            setError(errorMsg);
            toast.error(errorMsg);
            setIsReading(false);
            controller.abort();
            reject(err);
          }
        });

        ndef.addEventListener("readingerror", () => {
          const errorMsg = 'Erro ao ler tag NFC';
          setError(errorMsg);
          toast.error(errorMsg);
          setIsReading(false);
          controller.abort();
          reject(new Error(errorMsg));
        });
      });
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro ao iniciar leitura NFC';
      setError(errorMsg);
      toast.error(errorMsg);
      setIsReading(false);
      return null;
    }
  }, [isSupported]);

  // Gravar tag NFC
  const writeNFC = useCallback(async (
    ativoId: string,
    codigo: string,
    nome: string
  ): Promise<boolean> => {
    if (!isSupported) {
      setError('NFC não é suportado neste dispositivo/navegador');
      toast.error('NFC não é suportado neste dispositivo');
      return false;
    }

    try {
      setIsWriting(true);
      setError(null);

      const ndef = new window.NDEFReader();

      // Preparar dados para gravar
      const url = `https://annitrack.app/ativo/${ativoId}`;
      const jsonData = JSON.stringify({ id: ativoId, codigo, nome });

      const records = [
        { recordType: "url", data: url },
        { recordType: "text", data: codigo },
        { recordType: "mime", mediaType: "application/json", data: jsonData },
      ];

      toast.info('Aproxime a etiqueta NFC do dispositivo para gravar...');

      await ndef.write({ records });

      toast.success('Etiqueta NFC gravada com sucesso!');
      setIsWriting(false);
      return true;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro ao gravar tag NFC';
      setError(errorMsg);
      toast.error(errorMsg);
      setIsWriting(false);
      return false;
    }
  }, [isSupported]);

  // Parar leitura
  const stopReading = useCallback(() => {
    if (abortController) {
      abortController.abort();
      setAbortController(null);
    }
    setIsReading(false);
    toast.info('Leitura NFC cancelada');
  }, [abortController]);

  return {
    isSupported,
    isReading,
    isWriting,
    error,
    readNFC,
    writeNFC,
    stopReading,
  };
};
