

all: build/sexjs.wasm

dev: all build/sexjs.wat compile_commands.json

%.wat: %.wasm
	wasm2wat -o $@ $<

build/%.wasm: src/%.c
	@mkdir -p $(dir $@)
	clang --target=wasm32 -nostdlib -Wl,--no-entry -Wl,--export-all -o $@ $<

compile_commands.json:
	compiledb -n make
