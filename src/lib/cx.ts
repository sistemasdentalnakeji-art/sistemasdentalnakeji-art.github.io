/** Une nombres de clase e ignora los vacíos o falsos. */
export const cx = (...classes: (string | false | null | undefined)[]) => classes.filter(Boolean).join(' ')
