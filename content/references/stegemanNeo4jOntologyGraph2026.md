---
source: https://neo4j.com/blog/developer/the-neo4j-ontology-graph-specification-a-pragmatic-open-ai-first-approach/
title: "The Neo4j Ontology Graph Specification: A pragmatic, open, AI-first approach"
authors:
  - "[[john stegeman]]"
publication: Neo4j
date: 2026-11-05
tags:
  - inbox
citekey: stegemanNeo4jOntologyGraph2026
type: article
year: 2026
publisher: Neo4j
journal: "The Neo4j Ontology Graph Specification: A pragmatic, open, AI-first approach"
language: en-US
accessed: 2026-11-18
url: https://neo4j.com/blog/developer/the-neo4j-ontology-graph-specification-a-pragmatic-open-ai-first-approach/
description: We’re announcing the Neo4j Ontology Graph Specification, an open-source specification for representing domain knowledge in a machine-readable form that enables interoperability and automation across data, applications, and AI systems. Ontologies are critical components of AI systems and enterprise applications, and… Read more →
status: processed
added: 2026-11-18
ingested: 2026-11-19
published: 2026-11-05
publish: true
modified: 2026-11-19T10:03:06.293Z
---

# The Neo4j Ontology Graph Specification: A pragmatic, open, AI-first approach

Neo4j announced an open specification for writing domain knowledge as a versioned JSON or YAML document that people, databases, and agents can share. The point is a graph-shaped model that is strict enough to validate data and plain enough for an agent to read what a concept means, not only what labels exist.

Published 2026-11-05 by Jesús Barrasa and Oskar Hane. 7 min read. [Article](https://neo4j.com/blog/developer/the-neo4j-ontology-graph-specification-a-pragmatic-open-ai-first-approach/). Spec: [docs](https://neo4j.com/docs/ontology-graph-spec/). Repo: [neo4j/ontology-graph-spec](https://github.com/neo4j/ontology-graph-spec) (Apache 2.0).

## Why they built it

They treat ontologies as shared models for knowledge-graph construction and for GraphRAG, shaped by years of customer work and by their existing RDF/RDFS/OWL tooling (neosemantics). W3C standards stay in the picture. The spec maps selected RDFS and SHACL constructs and adds a graph-oriented form for operational systems and agents. They name the same need in Palantir Foundry, Databricks Genie Ontology, and Microsoft Fabric IQ: explicit, machine-readable domain knowledge that data systems and AI can use. They have not defined an RDF serialization yet.

A schema tells an agent what exists, not what it means. Their example is Account: it might be a bank account or a payment account, people may call it a bank account, and an IBAN identifies it. Descriptions and aliases carry that context next to the structure.

## What a document contains

One document, checked against a published JSON Schema. Versioned schemas are immutable (`/1.0.0/schema.json`); `/current/` points at the latest. Breaking changes are major versions. SDKs exist for JVM, JavaScript/TypeScript, and Go.

Core pieces:

- Nodes and relationships, keyed by stable ids, with identifying, implied, and optional labels, plus descriptions and aliases. A Customer can imply a Person.
- Properties using the Neo4j type system, including temporal, spatial, and vector types.
- Cardinality on each relationship end.
- Constraints (existence, uniqueness, key, property type), with shorthands that expand into full constraint objects.
- A reference field on every element, pointing at an external ontology term or doc.
- Named extensions for indexes, display hints, and data-source mappings, kept out of the model itself.

The same file is meant to do several jobs at once: database constraints, ontology-driven logic that derives or enriches data, and context for apps and agents. Built-in validators check that the schema can be created in Neo4j and that the mappings can import data.

## Getting started

Write a model for a graph you already run and validate it, for example with `check-jsonschema` against the published schema. They want issues for things the spec cannot express. A related NODES session is "Native ontology management in Neo4j."
