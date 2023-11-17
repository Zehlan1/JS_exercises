let nums = []

for(let i = 0; i < 100; i++) {
    nums[i] = getRandomInt(9)
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

async function asyncAdd(a, b) {
    if(typeof a!=='number' || typeof b!=='number') {
        return Promise.reject('At least one argument is not a number!')
    }
    return new Promise((resolve) => {
        setTimeout(() => {
          resolve(a+b);
        }, 100);
      });
}

async function asyncFastaBigSum(arr) {
    if(arr.length < 2) {
        return arr[0]
    }
    if(arr.length == 2) {
        return await asyncAdd(arr[0], arr[1])
    }
    if(arr.length > 2) {
        const half = Math.ceil(arr.length/2)
        const left = arr.slice(0, half)
        const right = arr.slice(half)
        return await asyncAdd(asyncFastaBigSum(left), asyncFastaBigSum(right))
    }
}

async function asyncBigSum(arr) {
    const begin = performance.now()
    let sum = 0
    for(let num of nums) {
        sum = await asyncAdd(sum, num)
    }
    console.log('Time: '+ (performance.now()-begin)+'ms')
    return sum
}

async function test(arr) {
    const begin = performance.now()
    await asyncFastaBigSum(arr)
    console.log('Time: '+ (performance.now()-begin)+'ms')
    return
}


