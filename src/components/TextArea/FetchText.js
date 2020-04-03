import React, { Component } from 'react'
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import './textAreaStyle.scss'

export default class FetchText extends Component {
    render() {
        const truncate = (editorState, charCount) =>{
            const contentState = editorState.getCurrentContent();
            const blocks = contentState.getBlockMap();

            let count = 0;
            let isTruncated = false;
            const truncatedBlocks = [];
            blocks.forEach((block) => {
                if (!isTruncated) {
                    const length = block.getLength();
                    if (count + length > charCount) {
                        isTruncated = true;
                        const truncatedText = block.getText().slice(0, charCount - count);
                        console.log(contentState)
                        const state = contentState.createFromText(`${truncatedText}...`);
                        truncatedBlocks.push(state.getFirstBlock());
                    } else {
                        truncatedBlocks.push(block);
                    }
                    count += length + 1;
                }
            });

            if (isTruncated) {
                const state = contentState.createFromBlockArray(truncatedBlocks);
                return EditorState.createWithContent(state);
            }

            return editorState;
        }
        
        const ContentState = convertFromRaw(JSON.parse(this.props.description));
        const editorState = EditorState.createWithContent(ContentState);
        // const TrancatedText = this.props.charCount ? truncate(editorState, this.props.charCount): editorState
        return (
            <div className="RichEditor-Fetch-root">
                <Editor editorState={editorState} readOnly={true} />
            </div>
        );
    }
}
