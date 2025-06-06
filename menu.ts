import readlinesync = require("readline-sync");
import { colors } from "./src/util/colors";
import { ContaCorrente } from "./src/model/ContaCorrente";
import { ContaPoupanca } from "./src/model/ContaPoupanca";
import { ContaController } from "./src/controller/ContaController";

export function main() {

    let contas: ContaController = new ContaController();

    let opcao, numero, agencia, tipo, saldo, limite, aniversario: number;
    let titular: string;
    const tiposContas = ['Conta Corrente', 'Conta Poupanca'];

    console.log("\nCriar Contas\n");

    let cc1: ContaCorrente = new ContaCorrente(contas.gerarNumero(), 123, 1, "Pedro da Silva", 1000, 100.0);
    contas.cadastrar(cc1);

    let cc2: ContaCorrente = new ContaCorrente(contas.gerarNumero(), 124, 1, "Laura de Carvalho", 2000, 100.0);
    contas.cadastrar(cc2);

    let cp1: ContaPoupanca = new ContaPoupanca(contas.gerarNumero(), 125, 2, "Isabella dos Santos", 4000, 12);
    contas.cadastrar(cp1);

    let cp2: ContaPoupanca = new ContaPoupanca(contas.gerarNumero(), 125, 2, "Cristina Maria", 8000, 15);
    contas.cadastrar(cp2);

    contas.listarTodas();

    while (true) {

        console.log(`${colors.bg.lilac}${colors.fg.white}*****************************************************${colors.reset}`);
        console.log(`${colors.bg.lilac}${colors.fg.white}                                                     ${colors.reset}`);
        console.log(`${colors.bg.lilac}${colors.fg.white}               BEM-VINDO AO GRANAGO 💜               ${colors.reset}`);
        console.log(`${colors.bg.lilac}${colors.fg.white}                                                     ${colors.reset}`);
        console.log(`${colors.bg.lilac}${colors.fg.white}*****************************************************${colors.reset}`);
        console.log(`${colors.fg.lilac}            1 - Criar Conta${colors.reset}`);
        console.log(`${colors.fg.pink}            2 - Listar todas as Contas${colors.reset}`);
        console.log(`${colors.fg.softblue}            3 - Buscar Conta por Número${colors.reset}`);
        console.log(`${colors.fg.softgreen}            4 - Atualizar Dados da Conta${colors.reset}`);
        console.log(`${colors.fg.softyellow}            5 - Apagar Conta${colors.reset}`);
        console.log(`${colors.fg.lilac}            6 - Sacar${colors.reset}`);
        console.log(`${colors.fg.pink}            7 - Depositar${colors.reset}`);
        console.log(`${colors.fg.softblue}            8 - Transferir valores entre Contas${colors.reset}`);
        console.log(`${colors.fg.softgreen}            9 - Sair${colors.reset}`);
        console.log();

        console.log("Entre com a opção desejada: ");
        opcao = readlinesync.questionInt("");

        if (opcao == 9) {
            console.log("\nBanco GranaGo - Seu dinheiro corre... mas volta! 🏃💸");
            sobre();
            process.exit(0);
        }

        switch (opcao) {
            case 1:
                console.log("\n\nCriar Conta\n\n");

                console.log("Digite o Número da agência: ");
                agencia = readlinesync.questionInt("");

                console.log("Digite o Nome do Titular da conta: ");
                titular = readlinesync.question("");

                console.log("\nDigite o tipo da Conta: ");
                tipo = readlinesync.keyInSelect(tiposContas, "", { cancel: false }) + 1;

                console.log("\nDigite o Saldo da conta (R$): ");
                saldo = readlinesync.questionFloat("");

                switch (tipo) {
                    case 1:
                        console.log("Digite o Limite da Conta (R$): ");
                        limite = readlinesync.questionFloat("");
                        contas.cadastrar(
                            new ContaCorrente(contas.gerarNumero(), agencia, tipo, titular,
                                saldo, limite));
                        break;
                    case 2:
                        console.log("Digite o Dia do aniversário da Conta Poupança: ");
                        aniversario = readlinesync.questionInt("");
                        contas.cadastrar(new ContaPoupanca(contas.gerarNumero(), agencia,
                            tipo, titular, saldo, aniversario));
                        break;
                }

                keyPress()
                break;

            case 2:
                console.log("\n\nListar todas as Contas\n\n");

                contas.listarTodas();

                keyPress()
                break;

            case 3:
                console.log("\n\nConsultar dados da Conta - por número\n\n");

                console.log("Digite o número da Conta: ");
                numero = readlinesync.questionInt("");
                contas.procurarPorNumero(numero);

                keyPress()
                break;

            case 4:
                console.log("\n\nAtualizar dados da Conta\n\n");

                console.log("Digite o número da Conta: ");
                numero = readlinesync.questionInt("");

                let conta = contas.buscarNoArray(numero);

                if (conta !== null) {

                    console.log("Digite o Número da agência: ");
                    agencia = readlinesync.questionInt("");

                    console.log("Digite o Nome do Titular da conta: ");
                    titular = readlinesync.question("");

                    tipo = conta.tipo;

                    console.log("\nDigite o Saldo da conta (R$): ");
                    saldo = readlinesync.questionFloat("");

                    switch (tipo) {
                        case 1:
                            console.log("Digite o Limite da Conta (R$): ");
                            limite = readlinesync.questionFloat("");
                            contas.atualizar(
                                new ContaCorrente(numero, agencia, tipo, titular, saldo, limite));
                            break;
                        case 2:
                            console.log("Digite o Dia do aniversário da Conta Poupança: ");
                            aniversario = readlinesync.questionInt("");
                            contas.atualizar(new ContaPoupanca(numero, agencia, tipo, titular, saldo,
                                aniversario));
                            break;
                    }

                } else {
                    console.log(colors.fg.lilac, "\nA Conta numero: " + numero +
                        " não foi encontrada!", colors.reset);
                }

                keyPress()
                break;

            case 5:
                console.log("\n\nApagar uma Conta\n\n");

                console.log("Digite o número da Conta: ");
                numero = readlinesync.questionInt("");
                contas.deletar(numero);

                keyPress()
                break;

            case 6:
                console.log("\n\nSaque\n\n");

                console.log("Digite o número da Conta: ");
                numero = readlinesync.questionInt("");

                console.log("Digite o valor do Saque (R$): ");
                let valorSaque = readlinesync.questionFloat("");

                contas.sacar(numero, valorSaque);


                keyPress()
                break;

            case 7:
                console.log("\n\nDepósito\n\n");

                console.log("Digite o número da Conta: ");
                numero = readlinesync.questionInt("");

                console.log("Digite o valor do Depósito (R$): ");
                let valorDeposito = readlinesync.questionFloat("");

                contas.depositar(numero, valorDeposito);

                keyPress();
                break;
            case 8:
                console.log("\n\nTransferência entre Contas\n\n");

                console.log("Digite o número da Conta de Origem: ");
                let numeroOrigem = readlinesync.questionInt("");

                console.log("Digite o número da Conta de Destino: ");
                let numeroDestino = readlinesync.questionInt("");

                console.log("Digite o valor da Transferência (R$): ");
                let valorTransferencia = readlinesync.questionFloat("");

                contas.transferir(numeroOrigem, numeroDestino, valorTransferencia);


                keyPress()
                break;

            default:
                console.log("\nOpção Inválida!\n");

                keyPress()
                break;
        }
    }

}

function sobre(): void {
    console.log(`${colors.fg.lilac}\n*****************************************************${colors.reset}`);
    console.log(`${colors.fg.pink}Projeto Desenvolvido por: Naah Carvalho${colors.reset}`);
    console.log(`${colors.fg.softblue}Email: naah_.carvalho@outlook.com${colors.reset}`);
    console.log(`${colors.fg.pink}GitHub: https://github.com/naahcarvalho${colors.reset}`);
    console.log(`${colors.fg.lilac}*****************************************************${colors.reset}`);
}

function keyPress(): void {
    console.log(colors.reset, "");
    console.log("\nPressione enter para continuar...");
    readlinesync.prompt();
}

main();
