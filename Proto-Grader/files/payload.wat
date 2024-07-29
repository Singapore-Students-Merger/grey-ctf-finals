(module
  (type $t0 (func (param i32 i32) (result i32)))
  (import "env" "memory" (memory $env.memory 0))
  (func $levenshtein (export "levenshtein") (type $t0) (param $p0 i32) (param $p1 i32) (result i32)
    ;; Immediately return 0
    (i32.const 0)
  )
  (export "memory" (memory $env.memory)))
