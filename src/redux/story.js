import axios from 'axios';
import get from 'lodash/get';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import {createSlice} from '@reduxjs/toolkit';
import {setError} from './errors';
import {DOMAIN_PORT} from '../constants';

const storySlice = createSlice({
    name: 'story',
    initialState: {
        inviteId: null,
        storyId: null,
        language: '',
        authorLimit: 3,
        otherParagraphs: [],
        currentParagraph: '',
        isLastParagraph: false,
        canEdit: false,
        introParagraphs: [],
        selectedIntroParagraphIndex: 0,
    },
    reducers: {
        setStory: (state, action) => {
            const {
                inviteId,
                storyId,
                language,
                authorLimit,
                otherParagraphs,
                isLastParagraph,
                canEdit,
            } = action.payload;

            state.inviteId = inviteId;
            state.storyId = storyId;
            state.language = language;
            state.authorLimit = authorLimit;
            state.otherParagraphs = otherParagraphs;
            state.isLastParagraph = isLastParagraph;
            state.canEdit = canEdit;
        },

        updateStateByKey: (state, action) => {
            const {key, value} = action.payload;

            if (!(key in state)) {
                throw Error(`Trying to set a key (${key}) that does not exists in Story state`);
            }

            state[key] = value;
        },

        setIntroParagraph: (state, action) => {
            const {intros} = action.payload;

            state.introParagraphs = intros;
        }
    },
});

const getStoryDTO = (responseData) => ({
    storyId: get(responseData, 'storyId', null),
    inviteId: get(responseData, 'inviteId', null),
    language: get(responseData, 'language', ''),
    authorLimit: get(responseData, 'authorLimit', 5),
    otherParagraphs: get(responseData, 'otherParagraphs', ''),
    isLastParagraph: get(responseData, 'isLastParagraph', false),
    canEdit: get(responseData, 'canEdit', false),
});

export const {setStory, updateStateByKey, setIntroParagraph} = storySlice.actions;

// export const getStory = ({numberOfAuthors, language, history}) => async (dispatch) => {
//         dispatch(setStory({
//             language,
//             numberOfAuthors,
//         }));

//         history.push(`/story`);
// };

// export const getStoryById = ({storyId}) => async (dispatch) => {
//     try {
//         const {data} = await axios.get(`http://${DOMAIN_PORT}/story/${storyId}`);

//         const {id: savedStoryId, paragraphs, authorsLimit, language, status} = data;

//         dispatch(setStory({
//             id: savedStoryId,
//             language,
//             numberOfParticipants: authorsLimit,
//             paragraphs,
//             canAccess: status === 'IN_PROGRESS',
//         }));
//     } catch (e) {
//         console.error(e);
//     }
// };

export const getStoryById = ({inviteId, storyId}) => async (dispatch) => {
    try {
        // get story by storyId/inviteID 
        // return story data

        // 1. if inviteId is present, BE is going to check if inviteId is valid then return storyID data, show editor if inviteId is good
        // 2. if not inviteId, just get storyID, get data, read only mode.
    } catch (e) {
        console.error(e);
    }
};

// export const saveStory = ({storyId, paragraph, authorId}) => async (dispatch) => {
//     const {data} = await axios.put(
//         `http://${DOMAIN_PORT}/story/paragraph`,
//         {
//             content: paragraph,
//             storyId,
//             authorId,
//         }
//     );

//     const {id: savedStoryId, paragraphs, authorsLimit, language} = data;

//     dispatch(setStory({
//         id: savedStoryId,
//         language,
//         numberOfParticipants: authorsLimit,
//         paragraphs,
//     }));
// }

// export const createInvite = ({authorId, storyId}) => async (dispatch) => {
//     try {
//         const {data} = await axios.post(
//             `http://${DOMAIN_PORT}/invite`,
//             {authorId, storyId},
//         );

//         const {id} = data;

//         dispatch(setInvitationId(id));
//     } catch (e) {
//         console.error(e);
//     }
// } 

export const upsertStory = ({
    userId,
    storyId,
    inviteId,
    paragraph,
    introParagraphs,
    authorLimit,
    language,
    wordCount,
    authorName,
    email,
    token,
}) => async (dispatch) => {
    console.log({
        userId,
        storyId,
        inviteId,
        paragraph,
        introParagraphs,
        authorLimit,
        language,
        wordCount,
        authorName,
        email,
        token,
    })
    // must have token to do upsert action
    // call api
    // return invite code 
}

export const getStoryByIds = ({inviteId, storyId}) => async (dispatch) => {
    // TODO: check if user is logged in?
    if (inviteId === null && storyId === null) {
        updateStateByKey({key: 'canEdit', value: true});

        return;
    }

    try {
        const {data, status} = await axios.get(`http://${DOMAIN_PORT}/story/${storyId}?inviteId=${inviteId}`);

        if (status === 200 && data) {
            dispatch(setStory(getStoryDTO(data)))
        } else {
            dispatch(updateStateByKey({key: 'canEdit', value: false}));
        }
    } catch {
        // TODO: remove
        // dispatch(updateStateByKey({key: 'canEdit', value: false}));
    }
}

export const getIntroParagraphsByLanguage = (language) => async (dispatch) => {
    try {
        // const {data, status} = await axios.get(`http://${DOMAIN_PORT}/introductions?language=${language}`);
        
        const data = {
            intros: [
                {
                    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum quis augue sed lectus suscipit vulputate in ac velit. Sed ex mi, lacinia nec magna a, dignissim malesuada ipsum. Maecenas vulputate, lorem vitae placerat mattis, velit ante elementum ex, ac commodo nunc metus sit amet tellus. Curabitur sodales nec erat sed rutrum. Donec pellentesque ornare ligula ac consectetur. Proin gravida ligula in tristique suscipit. Aenean lacinia at ipsum eget dictum. In elementum volutpat arcu, at vehicula erat pellentesque id. Phasellus lacus dui, convallis id mattis in, pellentesque eu sapien. Praesent id diam ac ligula scelerisque imperdiet sit amet at tellus. Aenean ex sapien, facilisis nec facilisis eget, blandit nec metus. Maecenas rhoncus in elit laoreet placerat. Curabitur varius fermentum lacus rutrum malesuada.',
                    wordCount: 100,
                },
                {
                    content: 'Sed cursus urna eget sagittis luctus. Cras eu ligula leo. Praesent pharetra elementum massa, vitae vestibulum nulla accumsan ac. Ut leo risus, iaculis at lorem suscipit, vehicula ultricies tortor. Maecenas dignissim sodales orci, ac sagittis risus lobortis sed. Nullam vitae diam aliquet mi luctus auctor tempor vitae mi. Integer pellentesque quam ac semper pulvinar. In placerat lacinia leo, quis pretium sapien ullamcorper eu. Fusce venenatis, nulla eget dictum consequat, felis urna tempor diam, eget pellentesque est libero ut lectus. Donec consequat risus sit amet ultrices pharetra.',
                    wordCount: 200,
                },
                {
                    content: 'Vestibulum sit amet velit quis urna ullamcorper mollis sit amet vel lectus. Quisque pharetra tristique vestibulum. Vivamus in ipsum massa. Etiam tortor erat, luctus ac mi vitae, consequat finibus quam. Duis sodales tellus elit, venenatis sodales ex pulvinar vitae. Phasellus pretium cursus dolor, sit amet faucibus libero iaculis et. Nam fringilla lorem ac rutrum porta. Nam at mollis tortor.',
                    wordCount: 100,
                },
                {
                    content: 'Donec sagittis bibendum massa, sodales porttitor ante. Sed sapien leo, commodo eu tempus eu, tincidunt ac leo. Ut eget ullamcorper leo. Donec ut odio ultricies, finibus purus eget, rhoncus leo. Vestibulum malesuada risus massa, vitae eleifend diam consequat et. Sed dictum orci eget varius imperdiet. Ut dapibus vulputate nisi, in dignissim tellus sagittis nec.',
                    wordCount: 230,
                },
                {
                    content: 'Vestibulum quis ante sit amet urna convallis tristique non eu lectus. Nam molestie purus ac purus maximus, vel molestie lectus venenatis. Etiam vitae odio vel urna lacinia iaculis. Maecenas tristique magna et metus varius mattis. Aenean mattis vel odio vel egestas. Sed at consectetur nulla, vitae vehicula nisi. Phasellus facilisis, nisl in volutpat dictum, lorem lectus vestibulum turpis, vel maximus mi purus id neque. Morbi tincidunt feugiat accumsan. Aliquam dignissim vestibulum augue, eu efficitur orci.',
                    wordCount: 140,
                },
            ]
        };

        const status = 200;

        if (status === 200 && data) {
            const {intros} = data;
            dispatch(setIntroParagraph({intros: intros.map(({content}) => content)}));  
        }
    } catch {}
}


export const getStory = (state) => omit(state.story, [
    'currentParagraph',
    'wordCount',
]);

export const getCurrentParagraph = (state) => state.story.currentParagraph;
export const getLanguage = (state) => state.story.language;
export const getAuthorLimit = (state) => state.story.authorLimit;
export const getIntroParagraphIndex = (state) => state.story.selectedIntroParagraphIndex;
export const getIntroParagraphs = (state) => state.story.introParagraphs;

export default storySlice.reducer;