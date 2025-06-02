import readlinesync = require("readline-sync");

import { colors } from './src/util/colors';  // seu arquivo de cores

export function main() {

    let opcao: number;

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

                break;
            case 2:
                console.log("\n\nListar todas as Contas\n\n");

                break;
            case 3:
                console.log("\n\nConsultar dados da Conta - por número\n\n");

                break;
            case 4:
                console.log("\n\nAtualizar dados da Conta\n\n");

                break;
            case 5:
                console.log("\n\nApagar uma Conta\n\n");

                break;
            case 6:
                console.log("\n\nSaque\n\n");

                break;
            case 7:
                console.log("\n\nDepósito\n\n");

                break;
            case 8:
                console.log("\n\nTransferência entre Contas\n\n");

                break;
            default:
                console.log("\nOpção Inválida!\n");

                break;
        }
    }

}

export function sobre(): void {
    console.log(`${colors.fg.lilac}\n*****************************************************${colors.reset}`);
    console.log(`${colors.fg.pink}Projeto Desenvolvido por: Naah Carvalho${colors.reset}`);
    console.log(`${colors.fg.softblue}Generation Brasil - generation@generation.org${colors.reset}`);
    console.log(`${colors.fg.pink}github.com/conteudoGeneration${colors.reset}`);
    console.log(`${colors.fg.lilac}*****************************************************${colors.reset}`);
}

main();

