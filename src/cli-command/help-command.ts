import { CliCommandInterface } from './cli-command.interface.js';
import chalk from 'chalk';

export default class HelpCommand implements CliCommandInterface {
  public readonly name = '--help';

  public async execute(): Promise<void> {
    console.log(`
        Программа для подготовки данных для REST API сервера.
        ${chalk.bold('Пример:')}
            main.js --<command> [--arguments]
        ${chalk.bold('Команды:')}
            ${chalk.green('--version:')}                       ${chalk.italic('# выводит номер версии')}
            ${chalk.green('--help:')}                          ${chalk.italic('# печатает этот текст')}
            ${chalk.green('--import')} <filepath>:             ${chalk.italic('# импортирует данные из TSV')}
            ${chalk.green('--generator')} <n> <filepath> <url> ${chalk.italic('# генерирует произвольное количество тестовых данных')}
        `);
  }
}
