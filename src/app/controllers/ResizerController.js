import processFiles from '../../utils/resizer';
import zipData from '../../utils/zipFolder';

class ResizerController {
  async store(req, res) {
    try {
      console.log('Iniciando processamento dos arquivos');

      await processFiles();

      console.log('Processo finalizado');
      console.log('Iniciando compactação');

      await zipData();

      return res.json(true);
    } catch (e) {
      console.log('Erro no processamento', e);
      return res.json(false);
    }
  }
}

export default new ResizerController();
