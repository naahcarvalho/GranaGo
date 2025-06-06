import { Conta } from "../model/Conta";
import { ContaRepository } from "../repository/ContaRepository";
import { colors } from "../util/colors";

export class ContaController implements ContaRepository {

    private listaContas: Array<Conta> = new Array<Conta>();
    numero: number = 0;

    procurarPorNumero(numero: number): void {
        let buscaConta = this.buscarNoArray(numero);

        if (buscaConta !== null) {
            buscaConta.visualizar();
        } else
            console.log(colors.fg.lilac, "\nA Conta numero: " + numero
                + " não foi encontrada!", colors.reset);
    }

    listarTodas(): void {
        for (let conta of this.listaContas) {
            conta.visualizar();
        };
    }

    cadastrar(conta: Conta): void {
        this.listaContas.push(conta);
        console.log(colors.fg.lilac, "\nA Conta número: " + conta.numero +
            " foi criada com sucesso!", colors.reset);
    }

    atualizar(conta: Conta): void {
        let buscaConta = this.buscarNoArray(conta.numero);

        if (buscaConta != null) {
            this.listaContas[this.listaContas.indexOf(buscaConta)] = conta;
            console.log(colors.fg.lilac, "\nA Conta numero: " + conta.numero +
                " foi atualizada com sucesso!", colors.reset);
        } else
            console.log(colors.fg.lilac, "\nA Conta numero: " + conta.numero +
                " não foi encontrada!", colors.reset);
    }

    deletar(numero: number): void {
        let buscaConta = this.buscarNoArray(numero);

        if (buscaConta !== null) {
            this.listaContas.splice(this.listaContas.indexOf(buscaConta), 1);
            console.log(colors.fg.lilac, "\nA Conta numero: " + numero +
                " foi apagada com sucesso!", colors.reset);
        } else
            console.log(colors.fg.lilac, "\nA Conta numero: " + numero +
                " não foi encontrada!", colors.reset);
    }

    sacar(numero: number, valor: number): void {
        const conta = this.buscarNoArray(numero);

        if (conta !== null) {
            if (valor <= 0) {
                console.log(colors.fg.lilac, "\nO valor deve ser maior que zero!", colors.reset);
                return;
            }

            const sucesso = conta.sacar(valor);

            if (sucesso) {
                console.log(colors.fg.lilac, `\nSaque de R$${valor.toFixed(2)} realizado com sucesso!`, colors.reset);
            }
        } else {
            console.log(colors.fg.lilac, `\nConta número ${numero} não encontrada.`, colors.reset);
        }
    }

    depositar(numero: number, valor: number): void {
        const conta = this.buscarNoArray(numero);

        if (conta !== null) {
            if (valor <= 0) {
                console.log(colors.fg.lilac, "\nO valor deve ser maior que zero!", colors.reset);
                return;
            }

            conta.depositar(valor);
            console.log(colors.fg.lilac, `\nDepósito de R$${valor.toFixed(2)} realizado com sucesso!`, colors.reset);
        } else {
            console.log(colors.fg.lilac, `\nConta número ${numero} não encontrada.`, colors.reset);
        }
    }

    transferir(numeroOrigem: number, numeroDestino: number, valor: number): void {
        const contaOrigem = this.buscarNoArray(numeroOrigem);
        const contaDestino = this.buscarNoArray(numeroDestino);

        if (contaOrigem !== null && contaDestino !== null) {
            if (valor <= 0) {
                console.log(colors.fg.lilac, "\nO valor deve ser maior que zero!", colors.reset);
                return;
            }

            const sucesso = contaOrigem.sacar(valor);

            if (sucesso) {
                contaDestino.depositar(valor);
                console.log(colors.fg.lilac, `\nTransferência de R$${valor.toFixed(2)} realizada com sucesso!`, colors.reset);
            }
        } else {
            console.log(colors.fg.lilac, `\nConta de origem ou destino não encontrada.`, colors.reset);
        }
    }

    public gerarNumero(): number {
        return ++this.numero;
    }

    public buscarNoArray(numero: number): Conta | null {

        for (let conta of this.listaContas) {
            if (conta.numero === numero)
                return conta;
        }

        return null;
    }

}