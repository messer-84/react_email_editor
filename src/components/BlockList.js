import React from 'react';
import Block from './Block';
import { connect } from 'react-redux';
import { rmBlock } from '../actions';
import { addBlock } from '../actions';
import { swapBlocks } from '../actions';
import { setVisible } from '../actions';
import { selectBlock } from '../actions';

const mapStateToProps = (state) => {
	return {
		common: state.common,
		template: state.template,
		components: state.components,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onRm: (id) => {
			dispatch(rmBlock(id));
		},
		onAdd: (block, index) => {
			dispatch(addBlock(block, index));
		},
		onDrop: (id, index) => {
			dispatch(swapBlocks(id, index));
		},
		selectBlock: (id) => {
			dispatch(selectBlock(id));
			dispatch(setVisible('options'));
		}
	};
};

const BlockList = connect(
	mapStateToProps,
	mapDispatchToProps
)(({ common, template, components, onAdd, onDrop, selectBlock }) => {
	let blockDragged = null;
	return (
		<div
			style={{
				'height': '100%',
				'display': 'flex',
				'overflowY': 'auto',
				'justifyContent': 'center',
			}}
		>
			<table
				cellPadding="0"
				cellSpacing="0"
				role="presentation"
				style={{
					'width':'570px',
					'boxShadow': 'rgb(102, 102, 102) 2px 2px 5px 1px',
				}}
			>
				<tbody>
					{template.map((block, index) =>
						<tr
							key={block.id}
							draggable="true"
							style={{
								'boxShadow': block.selected?'#4CAF50 0px 0px 3px 7px':''
							}}
							onClick={(e) => {e.stopPropagation(); selectBlock(block.id);}}
							onDragOver={ev => ev.preventDefault()}
							onDragStart={() => blockDragged = block.id}
							onDrop={() => {
									if (blockDragged) {
										onDrop(blockDragged, index);
									} else {
										let newBlock = components.filter(el => el.selected)[0].block;
										newBlock.options.container = Object.assign({}, newBlock.options.container, common);
										onAdd(newBlock, index);
									}
								}
							}
						>
							<td
								style={block.options.container}
							>
							<Block
								block={block}
							 />
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
		);
});

export default BlockList;
