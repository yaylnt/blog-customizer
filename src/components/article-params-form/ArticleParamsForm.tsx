import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import { useState, useRef } from 'react';
import clsx from 'clsx';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type FormProps = {
	articleState: ArticleStateType;
	setArticleState: (articleState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ setArticleState }: FormProps) => {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [draftState, setDraftState] = useState(defaultArticleState);
	const containerRef = useRef<HTMLDivElement | null>(null);

	const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsFormOpen(false);
		setArticleState(draftState);
	};

	const handleReset = () => {
		setDraftState(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	const updateFormField = (field: keyof ArticleStateType) => {
		return (option: OptionType) => {
			setDraftState({ ...draftState, [field]: option });
		};
	};

	useOutsideClickClose({
		isOpen: isFormOpen,
		onChange: setIsFormOpen,
		rootRef: containerRef,
	});

	return (
		<div ref={containerRef}>
			<ArrowButton
				isOpen={isFormOpen}
				onClick={() => setIsFormOpen(!isFormOpen)}
			/>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={submitForm}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={draftState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={updateFormField('fontFamilyOption')}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='font-size'
						options={fontSizeOptions}
						selected={draftState.fontSizeOption}
						onChange={updateFormField('fontSizeOption')}
					/>
					<Select
						title='Цвет шрифта'
						selected={draftState.fontColor}
						options={fontColors}
						onChange={updateFormField('fontColor')}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={draftState.backgroundColor}
						options={backgroundColors}
						onChange={updateFormField('backgroundColor')}
					/>
					<Select
						title='Ширина контента'
						selected={draftState.contentWidth}
						options={contentWidthArr}
						onChange={updateFormField('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
