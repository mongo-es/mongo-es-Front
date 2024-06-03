import React from "react";
import useOptimizeStore from "../../store/optimizeStore";

const OptimizePipelineExplain = () => {
    const { indexOptimize, pipeOptimize } = useOptimizeStore();
    console.log(indexOptimize, pipeOptimize);

    const groupIndexOptimize = (indexOptimize) => {
        const grouped = indexOptimize.reduce((acc, cur) => {
            if (acc[cur.dependentFiled]) {
                acc[cur.dependentFiled].push(cur.determinantField);
            } else {
                acc[cur.dependentFiled] = [cur.determinantField];
            }
            return acc;
        }, {});

        return Object.entries(grouped).map(([key, value]) => ({
            dependentFiled: key,
            determinantFields: value,
        }));
    };

    const groupedIndexOptimize = indexOptimize ? groupIndexOptimize(indexOptimize) : [];

    return (
        <div className="border border-solid border-gray-400 rounded-md w-[47%] max-h-[28vw] overflow-auto overflow-x-hidden p-6 bg-white">
            <div className="border border-1 border-gray-200 rounded-md shadow-md p-4 mb-6 bg-gray-50">
                <h2 className="text-xl font-bold mb-4 text-gray-800">파이프라인 최적화</h2>
                {pipeOptimize ? (
                    <ul className="list-disc pl-5 space-y-2">
                        {pipeOptimize.optimizeCategory.isMerged ? (
                            <li className="text-gray-700">
                                <span className="font-bold">분할 최적화:</span> 분할되어 있는 <span className="font-bold">$match</span> 단계를 병합해 보세요
                            </li>
                        ) : null}
                        {pipeOptimize.optimizeCategory.isChangedOrder ? (
                            <li className="text-gray-700">
                                <span className="font-bold">$match 순서 변경:</span> <span className="font-bold">$match</span> 순서를 변경하였습니다
                            </li>
                        ) : null}
                    </ul>
                ) : (
                    <p className="text-gray-500">파이프라인 최적화 정보가 없습니다.</p>
                )}
            </div>
            <div className="border border-1 border-gray-200 rounded-md shadow-md p-4 bg-gray-50">
                <h2 className="text-xl font-bold mb-4 text-gray-800">인덱스 최적화 제안</h2>
                {groupedIndexOptimize.length > 0 ? (
                    <ul className="list-disc pl-5 space-y-2">
                        {groupedIndexOptimize.map((opt, index) => (
                            <li key={index} className="text-gray-700">
                                <span className="font-bold">{opt.dependentFiled}</span> 조건을 <span className="font-bold">{opt.determinantFields.join(', ')}</span>을 활용하여 표현하면, 인덱스를 활용할 수 있어요
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">인덱스 최적화 제안이 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default OptimizePipelineExplain;
