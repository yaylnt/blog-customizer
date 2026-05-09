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
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import { useState, useRef } from 'react';
import clsx from 'clsx';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type FormProps = {
	setArticleState: (articleState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ setArticleState }: FormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [draftState, setDraftState] = useState(defaultArticleState);
	const containerRef = useRef<HTMLDivElement | null>(null);

	const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsOpen(false);
		setArticleState(draftState);
	};

	const resetForm = () => {
		setDraftState(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	useOutsideClickClose({
		isOpen,
		onChange: setIsOpen,
		rootRef: containerRef,
	});

	return (
		<div ref={containerRef}>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					style={{ gap: '50px' }}
					onSubmit={submitForm}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={draftState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) =>
							setDraftState({ ...draftState, fontFamilyOption: option })
						}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='font-size'
						options={fontSizeOptions}
						selected={draftState.fontSizeOption}
						onChange={(option) =>
							setDraftState({ ...draftState, fontSizeOption: option })
						}
					/>
					<Select
						title='Цвет шрифта'
						selected={draftState.fontColor}
						options={fontColors}
						onChange={(option) =>
							setDraftState({ ...draftState, fontColor: option })
						}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={draftState.backgroundColor}
						options={backgroundColors}
						onChange={(option) =>
							setDraftState({ ...draftState, backgroundColor: option })
						}
					/>
					<Select
						title='Ширина контента'
						selected={draftState.contentWidth}
						options={contentWidthArr}
						onChange={(option) =>
							setDraftState({ ...draftState, contentWidth: option })
						}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={resetForm}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
