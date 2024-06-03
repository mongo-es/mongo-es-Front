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
        <div className="border border-solid border-gray-400 rounded-md w-[47%] max-h-[28vw] overflow-auto overflow-x-hidden p-4">
            <div className="border border-1 border-gray-200 border-md shadow-md p-4 mb-4">
                <h2 className="text-lg font-semibold mb-2">파이프라인 최적화</h2>
                {pipeOptimize ? (
                    <ul className="list-disc pl-5">
                        {pipeOptimize.optimizeCategory.isMerged ? (
                            <li>분할 최적화<br />분할되어 있는 $match 단계를 병합해 보세요</li>
                        ) : null}
                        {pipeOptimize.optimizeCategory.isChangedOrder ? (
                            <li>$match 순서를 변경하였습니다</li>
                        ) : null}
                    </ul>
                ) : (
                    <p>파이프라인 최적화 정보가 없습니다.</p>
                )}
            </div>
            <div className="border border-1 border-gray-200 border-md shadow-md p-4">
                <h2 className="text-lg font-semibold mb-2">인덱스 최적화 제안</h2>
                {groupedIndexOptimize.length > 0 ? (
                    <ul className="list-disc pl-5">
                        {groupedIndexOptimize.map((opt, index) => (
                            <li key={index}>
                                <p>
                                    {opt.dependentFiled} 조건을 {opt.determinantFields.join(', ')}을 활용하여 표현하면, 인덱스를 활용할 수 있어요
                                </p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>인덱스 최적화 제안이 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default OptimizePipelineExplain;
