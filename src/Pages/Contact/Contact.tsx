import React, {FC, useCallback, useEffect, useState} from 'react'
import {
    Button,
    InfiniteScroll,
    List,
    DotLoading,
    SearchBar,
} from 'antd-mobile'

let count = 0

async function mockRequest() {
    if (count >= 5) {
        return []
    }
    count++
    return [
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
    ]
}

const Contact:FC=()=>{
    const [data, setData] = useState<string[]>([])
    const [hasMore, setHasMore] = useState(true)
    async function loadMore() {
        const append = await mockRequest()
        setData(val => [...val, ...append])
        setHasMore(append.length > 0)
    }

    const doSearch = useCallback(
            () => {
                setData([])
                setHasMore(true)
                loadMore()
            },
        []
    )

    useEffect(() => {
        doSearch()
    }, [doSearch])

    return <>
        <div >
            <div >
                <SearchBar />
            </div>
            <div >
                <Button size='small' color='primary' onClick={doSearch}>
                    搜索
                </Button>
            </div>
        </div>
        {data.length > 0 ? (
            <>
                <List>
                    {data.map((item, index) => (
                        <List.Item key={index}>{item}</List.Item>
                    ))}
                </List>
                <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
            </>
        ) : (
            <div >
                <div >
                    <DotLoading />
                </div>
                正在拼命加载数据
            </div>
        )}
    </>
}
export default Contact