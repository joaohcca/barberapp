interface ITemplateVariables {
  [key: string]: string | number
}

export default interface IParseMailTemplateDTO {
  file: string;
  variables: ITemplateVariables;
}

/**variables {name: "joao", link: "https://..."}
ITemplateVariables é um objeto indefinido que tem chaves do tipo string
com values do tipo string ou number, é uma maneira de definir um objeto sem
necessariamente definir todos as chaves, importante quando for muito mutável
*/
