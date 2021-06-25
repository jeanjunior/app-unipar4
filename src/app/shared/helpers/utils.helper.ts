const CPF_PATTERN = /^(\d{11}|\d{3}\.\d{3}\.\d{3}\-\d{2})$/;
const CNPJ_PATTERN = /^(\d{14}|\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2})$/;
export const maskCPF = [/[0-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
export const maskCNPJ = [/[0-9]/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];

export const isCPF = (value: string,): boolean => {
	if (!CPF_PATTERN.test(value))
		return false;
	const numbers = mapToNumbers(value);
	if (isRepeatedArray(numbers))
		return false;
	const validators = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
	const checkers = generateCheckSums(numbers, validators);
	return (
		numbers[9] === getRemaining(checkers[0]) &&
		numbers[10] === getRemaining(checkers[1])
	);
};

export const isCNPJ = (value: string): boolean => {
	if (!CNPJ_PATTERN.test(value)) {
		return false;
	}
	const numbers = mapToNumbers(value);
	if (isRepeatedArray(numbers)) {
		return false;
	}
	const validators = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
	const checkers = generateCheckSums(numbers, validators);
	return (
		numbers[12] === getRemaining(checkers[0]) &&
		numbers[13] === getRemaining(checkers[1])
	);
};

export const mapToNumbers = (value: string): Array<number> => mapToNumeric(value).split('').map(Number);

const NonNumeric = /\D/g;
export const mapToNumeric = (value: string): string => value.replace(NonNumeric, '');

export const isRepeatedArray = <T>(items: Array<T>): boolean => items.every((item) => items[0] === item);

type CheckSums = [number, number];
const generateCheckSums = (numbers: Array<number>, validators: Array<number>): CheckSums => {
	const initialCheckSums: CheckSums = [0, 0];
	return validators.reduce(([checkerA, checkerB], validator, index) => [
		(index === 0) ? 0 : (checkerA + numbers[index - 1] * validator),
		checkerB + numbers[index] * validator
	] as CheckSums, initialCheckSums);
};

const getRemaining = (value: number): number => (value % 11) < 2 ? 0 : 11 - (value % 11);

export const formatToCPF = (value: string): string => (
	mapToNumeric(value)
		.replace(/(\d{3})(\d)/, '$1.$2')
		.replace(/(\d{3})(\d)/, '$1.$2')
		.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
);

export const formatToCNPJ = (value: string): string => (
	mapToNumeric(value)
		.replace(/(\d{2})(\d)/, '$1.$2')
		.replace(/(\d{3})(\d)/, '$1.$2')
		.replace(/(\d{3})(\d)/, '$1/$2')
		.replace(/(\d{4})(\d{1,2})$/, '$1-$2')
);
