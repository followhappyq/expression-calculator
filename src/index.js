function eval() {
  // Do not use eval!!!
  return
}

function expressionCalculator(expr) {
  let exprArr = []
  if (typeof expr === "string") {
    let result = ""
    expr = expr.replace(/\s/g, "")
    for (let i = 0; i < expr.length; i++) {
      if (!isNaN(expr[i])) {
        let j = i
        while (!isNaN(expr[j])) {
          result += expr[j]
          j++
        }
        exprArr.push(result)
        result = ""
        i = j - 1
      } else {
        exprArr.push(expr[i])
      }
    }
    expr = exprArr
  }

  if (expr.filter((item) => item === "(").length !== expr.filter((item) => item === ")").length) {
    throw new Error("ExpressionError: Brackets must be paired")
  }

  let inBrackets = []
  let iFirstClosedBracket = expr.indexOf(")")
  let iOpenedBracket = expr.lastIndexOf("(", iFirstClosedBracket)
  if (iFirstClosedBracket !== -1) {
    inBrackets = expr.slice(iOpenedBracket + 1, iFirstClosedBracket)
    let final = PlusOrMinus(DivOrMult(inBrackets))
    let arr1 = expr.slice(0, iOpenedBracket).concat(final)
    expr = arr1.concat(expr.slice(iFirstClosedBracket + 1, expr.length))
    return expressionCalculator(expr)
  }
  final = Number(PlusOrMinus(DivOrMult(expr)).join()).toFixed(4)
  final = Number(final)
  return final
}

function DivOrMult(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "*") {
      arr.splice(i - 1, 3, +arr[i - 1] * +arr[i + 1])
      i = -1
    } else if (arr[i] === "/") {
      if (arr[i + 1] == 0) {
        throw new Error("TypeError: Division by zero.")
      }
      arr.splice(i - 1, 3, +arr[i - 1] / +arr[i + 1])
      i = -1
    }
  }
  return arr
}
function PlusOrMinus(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "+") {
      arr.splice(i - 1, 3, +arr[i - 1] + +arr[i + 1])
      i = -1
    } else if (arr[i] === "-") {
      arr.splice(i - 1, 3, +arr[i - 1] - +arr[i + 1])
      i = -1
    }
  }
  return arr
}

module.exports = {
  expressionCalculator,
}
