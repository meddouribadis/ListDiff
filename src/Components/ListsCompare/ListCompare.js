import React, { useState } from "react";
import { MdPlaylistRemove, MdLinkOff, MdSort, MdSwapVert, MdContentCopy, MdDelete } from "react-icons/md";

export default function ListCompare() {

    const [listA, setListA] = useState([]);
    const [listB, setListB] = useState([]);

    const countLines = (list) => {
        if (!list || list.length === 0) return 0;
        let words = list.split(/\r|\r\n|\n/);
        let cleanedArray = (words = words.map((function (t) {
            return t.trim()
        }))).filter((function (t) {
            return "" !== t
        }));
        return cleanedArray.length;
    }

    const countDuplicates = (list) => {
        if (!list || list.length === 0) return 0;
        let words = list.split(/\r|\r\n|\n/);
        let cleanedArray = (words = words.map((function (t) {
            return t.trim()
        }))).filter((function (t) {
            return "" !== t
        }));

        let i = cleanedArray.reduce((function (t, i) {
            return t[i] = (t[i] || 0) + 1, t
        }), {});
        let n = 0;

        for (let t in i) {
            i[t] > 1 && n++;
            //i[t] > 1 && console.log(t, i[t]);
        }
        return n;
    }

    const removeDuplicates = (list, setList) => {
        if (!list || list.length === 0) {
            setList("");
            return;
        }

        let words = list.split(/\r|\r\n|\n/);
        let cleanedArray = (words = words.map((function (t) {
            return t.trim()
        }))).filter((function (t) {
            return "" !== t
        }));

        let i = cleanedArray.reduce((function (t, i) {
            return t[i] = (t[i] || 0) + 1, t
        }), {});

        let myListArray = [];

        for (let t in i) {
            if (!myListArray.includes(t)) {
                myListArray.push(t);
            }
        }
        let c = myListArray.join("\n");
        setList(c);
    }

    const sortList = (list, setList) => {
        if (!list || list.length === 0) {
            setList("");
            return;
        }
        let myList = list.replace(/\r?\n$/, "");
        let myListArray = myList.split(/\r?\n/);
        myListArray.sort();
        let c = myListArray.join("\n");
        setList(c);
    }

    const reverseList = (list, setList) => {
        if (!list || list.length === 0) {
            setList("");
            return;
        }
        let myList = list.replace(/\r?\n$/, "");
        let myListArray = myList.split(/\r?\n/);
        myListArray.reverse();
        let c = myListArray.join("\n");
        setList(c);
    }

    const swapList = () => {
        let temp = listA;
        setListA(listB);
        setListB(temp);
    }

    return (
        <div className="p-5">
            <div className="grid grid-cols-2 gap-4">
                <div className="list-a">
                    <div className="w-full p-4 border border-gray-200 bg-gray-50 rounded-t-xl dark:border-gray-600 dark:bg-gray-700">
                        <div className="grid grid-cols-2 justify-between text-lg header">
                            <div className="title text-left">
                                <p>List A</p>
                            </div>
                            <div className="count text-right">
                                <p>
                                    <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                                        {countLines(listA)}
                                    </span>
                                    <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                                        {countDuplicates(listA)}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="code-preview-wrapper">
                        <div id="card-list-example" className="flex p-0 bg-white border-gray-200 bg-gradient-to-r code-preview dark:bg-gray-900 border-x dark:border-gray-600">
                            <textarea value={listA} onChange={(e) => setListA(e.target.value)} name="list-a" id="list-a" rows={10} className="w-full p-2.5 h-auto code-responsive-wrapper shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1">
                            </textarea>
                        </div>
                    </div>
                    <div className="footer w-full p-4 border border-gray-200 bg-gray-100 rounded-b-xl dark:border-gray-600 dark:bg-gray-700">
                        <div className="grid grid-cols-3 justify-between">
                            <div className="col-span-1 text-left">
                                <button onClick={() => { swapList() }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    A -{">"} B
                                </button>
                            </div>
                            <div className="col-span-2 text-right">
                                <button title="Test" className="bg-blue-500 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    <MdPlaylistRemove size={24} />
                                </button>
                                <button title="Supprimer les espaces et les doublons" onClick={() => removeDuplicates(listA, setListA)} className="bg-blue-500 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    <MdLinkOff size={24} />
                                </button>
                                <button title="Trier la liste" onClick={() => sortList(listA, setListA)} className="bg-blue-500 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    <MdSort size={24} />
                                </button>
                                <button title="Inverser la liste" onClick={() => reverseList(listA, setListA)} className="bg-blue-500 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    <MdSwapVert size={24} />
                                </button>
                                <button title="Copier" onClick={() => navigator.clipboard.writeText(listA)} className="bg-blue-500 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    <MdContentCopy size={24} />
                                </button>
                                <button title="Supprimer" onClick={() => setListA("")} className="bg-blue-500 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    <MdDelete size={24} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="list-b">
                <div className="w-full p-4 border border-gray-200 bg-gray-50 rounded-t-xl dark:border-gray-600 dark:bg-gray-700">
                        <div className="grid grid-cols-2 justify-between text-lg header">
                            <div className="title text-left">
                                <p>List B</p>
                            </div>
                            <div className="count text-right">
                                <p>
                                    <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                                        {countLines(listB)}
                                    </span>
                                    <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                                        {countDuplicates(listB)}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="code-preview-wrapper">
                        <div id="card-list-example" className="flex p-0 bg-white border-gray-200 bg-gradient-to-r code-preview dark:bg-gray-900 border-x dark:border-gray-600">
                            <textarea value={listB} onChange={(e) => setListB(e.target.value)} name="list-a" id="list-a" rows={10} className="w-full p-2.5 h-auto code-responsive-wrapper shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1">
                            </textarea>
                        </div>
                    </div>
                    <div className="footer w-full p-4 border border-gray-200 bg-gray-100 rounded-b-xl dark:border-gray-600 dark:bg-gray-700">
                        <div className="grid grid-cols-3 justify-between">
                            <div className="col-span-1 text-left">
                                <button onClick={() => { swapList() }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    A {"<"}- B
                                </button>
                            </div>
                            <div className="col-span-2 text-right">
                                <button title="Test" className="bg-blue-500 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    <MdPlaylistRemove size={24} />
                                </button>
                                <button title="Supprimer les espaces et les doublons" onClick={() => removeDuplicates(listB, setListB)} className="bg-blue-500 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    <MdLinkOff size={24} />
                                </button>
                                <button title="Trier la liste" onClick={() => sortList(listB, setListB)} className="bg-blue-500 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    <MdSort size={24} />
                                </button>
                                <button title="Inverser la liste" onClick={() => reverseList(listB, setListB)} className="bg-blue-500 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    <MdSwapVert size={24} />
                                </button>
                                <button title="Copier" onClick={() => navigator.clipboard.writeText(listB)} className="bg-blue-500 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    <MdContentCopy size={24} />
                                </button>
                                <button title="Supprimer" onClick={() => setListB("")} className="bg-blue-500 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    <MdDelete size={24} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}