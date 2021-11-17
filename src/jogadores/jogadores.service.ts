import { Injectable, Logger } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class JogadoresService {
  private jogadores: Jogador[] = [];

  private readonly logger = new Logger(JogadoresService.name);

  async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
    const { email } = criarJogadorDto;
    const jogadorEncontrado = await this.jogadores.find(
      jogador =>
        jogador.email === email
    )

    if (jogadorEncontrado) {
      return await this.atualizar()
    } else {
      await this.criar(criarJogadorDto)
    }

  }
  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadores
  }

  async criar(criarJogadorDto: CriarJogadorDto): void {
    const { nome, telefone, email, banana } = criarJogadorDto;
    const jogador: Jogador = {
      _id: uuidv4(),
      nome,
      telefone,
      email,
      banana,
      ranking: 'A',
      positionRanking: 1,
      urlFotoJogador: 'www.google.com.br/foto123.jpg',
    };
    this.logger.log(`criaJogadorDto: ${JSON.stringify(jogador)}`);
    this.jogadores.push(jogador);
  }
}
